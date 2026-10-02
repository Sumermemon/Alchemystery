import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA = 'C:\\Users\\OM\\AppData\\Local\\Temp\\chrome_cdp_audit_v2';
const PORT = 9222;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWsUrl() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        const data = await res.json();
        return data.webSocketDebuggerUrl;
      }
    } catch (e) {
      // wait
    }
    await sleep(250);
  }
  throw new Error('Chrome CDP port not responding');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const cb = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) cb.reject(msg.error);
        else cb.resolve(msg.result);
      }
    };
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function run() {
  console.log('Starting headless Chrome for full audit...');
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ]);

  try {
    const wsUrl = await getWsUrl();
    console.log('Connected to Chrome CDP:', wsUrl);

    const outDir = 'C:\\Users\\OM\\AppData\\Local\\Temp\\alchemystery_audit_v2';
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // 1. Audit Loader specifically on fresh page load
    console.log('--- AUDITING LOADER ---');
    const loaderTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:3000`, { method: 'PUT' });
    const loaderTarget = await loaderTargetRes.json();
    const loaderClient = new CDPClient(loaderTarget.webSocketDebuggerUrl);
    await loaderClient.ready();
    await loaderClient.send('Page.enable');

    // Capture loader mid-flight
    await sleep(400);
    const midShot = await loaderClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'loader_400ms.png'), Buffer.from(midShot.data, 'base64'));

    await sleep(400);
    const mid800Shot = await loaderClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'loader_800ms.png'), Buffer.from(mid800Shot.data, 'base64'));

    // Wait until loader completely unmounts from DOM
    let unmounted = false;
    for (let i = 0; i < 30; i++) {
      const check = await loaderClient.send('Runtime.evaluate', {
        expression: '(!document.getElementById("alchemystery-loader"))',
        returnByValue: true,
      });
      if (check.result.value === true) {
        console.log(`Loader unmounted cleanly after ~${i * 100 + 800}ms`);
        unmounted = true;
        break;
      }
      await sleep(100);
    }
    console.log('Loader unmount check passed:', unmounted);
    await sleep(300);

    const afterShot = await loaderClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'hero_after_loader_exit.png'), Buffer.from(afterShot.data, 'base64'));

    // 2. Audit Responsiveness across viewports
    console.log('--- AUDITING RESPONSIVENESS ACROSS VIEWPORTS ---');
    const devices = [
      { name: 'mobile_390', width: 390, height: 844, scale: 2, mobile: true },
      { name: 'mobile_360', width: 360, height: 800, scale: 2, mobile: true },
      { name: 'tablet_768', width: 768, height: 1024, scale: 2, mobile: true },
      { name: 'desktop_1440', width: 1440, height: 900, scale: 1, mobile: false },
      { name: 'desktop_4k', width: 2560, height: 1440, scale: 1, mobile: false },
    ];

    const sections = [
      { id: 'hero', selector: 'header' },
      { id: 'practice', selector: '#practice' },
      { id: 'sessions', selector: '#sessions' },
      { id: 'about', selector: '#about' },
      { id: 'steps', selector: '#steps' },
      { id: 'insights', selector: '#insights' },
    ];

    for (const dev of devices) {
      console.log(`\nTesting ${dev.name} (${dev.width}x${dev.height})...`);
      await loaderClient.send('Emulation.setDeviceMetricsOverride', {
        width: dev.width,
        height: dev.height,
        deviceScaleFactor: dev.scale,
        mobile: dev.mobile,
      });

      // Check horizontal overflow
      const overflow = await loaderClient.send('Runtime.evaluate', {
        expression: `({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
        })`,
        returnByValue: true,
      });
      console.log(`${dev.name} overflow:`, overflow.result.value);

      // Scroll to each section and capture
      for (const sec of sections) {
        const scrollInfo = await loaderClient.send('Runtime.evaluate', {
          expression: `(() => {
            document.documentElement.style.scrollBehavior = 'auto';
            const el = document.querySelector("${sec.selector}");
            if (el) {
              const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
              window.scrollTo(0, Math.max(0, top));
              return { found: true, top: window.scrollY };
            }
            return { found: false, top: window.scrollY };
          })()`,
          returnByValue: true,
        });
        console.log(`Scroll to ${sec.id}:`, scrollInfo.result.value);
        await sleep(400);
        const shot = await loaderClient.send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, `${dev.name}_${sec.id}.png`), Buffer.from(shot.data, 'base64'));
      }

      // If mobile (< 768), test MobileNav drawer opening and closing
      if (dev.width < 768) {
        console.log(`Testing mobile navigation menu on ${dev.name}...`);
        await loaderClient.send('Runtime.evaluate', {
          expression: `
            window.scrollTo(0, 0);
            const btn = document.getElementById('mobile-nav-toggle');
            if (btn) btn.click();
          `,
        });
        await sleep(350);
        const drawerShot = await loaderClient.send('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, `${dev.name}_mobile_drawer.png`), Buffer.from(drawerShot.data, 'base64'));

        // Close drawer
        await loaderClient.send('Runtime.evaluate', {
          expression: `
            const btn = document.querySelector('button[aria-label="Close navigation menu"]');
            if (btn) btn.click();
          `,
        });
        await sleep(350);
      }
    }

    console.log('\nAudit complete! All artifacts saved to:', outDir);
    loaderClient.close();
  } finally {
    chrome.kill();
  }
}

run().catch((err) => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
