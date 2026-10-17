'use client';

import * as React from 'react';
import { createContext, useContext, useCallback, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Types                                                                  */
/* ------------------------------------------------------------------ */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, 'id'>) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  dismiss: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/* Context                                                               */
/* ------------------------------------------------------------------ */
const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

/* ------------------------------------------------------------------ */
/* Provider                                                              */
/* ------------------------------------------------------------------ */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type, title, message, duration = 4500 }: Omit<Toast, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
    },
    [dismiss]
  );

  const success = useCallback((title: string, message?: string) => toast({ type: 'success', title, message }), [toast]);
  const error = useCallback((title: string, message?: string) => toast({ type: 'error', title, message, duration: 6000 }), [toast]);
  const warning = useCallback((title: string, message?: string) => toast({ type: 'warning', title, message }), [toast]);
  const info = useCallback((title: string, message?: string) => toast({ type: 'info', title, message }), [toast]);

  return (
    <ToastContext.Provider value={{ toasts, toast, success, error, warning, info, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Toast Container + Individual Toast                                    */
/* ------------------------------------------------------------------ */
const CONFIG: Record<ToastType, { icon: React.ElementType; accent: string; bg: string; border: string; text: string }> = {
  success: { icon: CheckCircle, accent: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.3)', text: '#6ee7b7' },
  error:   { icon: XCircle,     accent: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.3)',   text: '#fca5a5' },
  warning: { icon: AlertTriangle,accent: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', text: '#fcd34d' },
  info:    { icon: Info,         accent: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.3)',  text: '#93c5fd' },
};

import { createPortal } from 'react-dom';

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-label="Notifications"
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        width: 'calc(100vw - 48px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body
  );
}

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [closing, setClosing] = React.useState(false);
  const cfg = CONFIG[t.type];
  const Icon = cfg.icon;

  function handleDismiss() {
    setClosing(true);
    setTimeout(() => onDismiss(t.id), 200);
  }

  return (
    <div
      role="alert"
      style={{
        pointerEvents: 'all',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 18px',
        borderRadius: '12px',
        background: '#0e1327',
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 12px 40px rgba(0,0,0,0.7), 0 0 20px ${cfg.bg}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        backdropFilter: 'blur(24px)',
        transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
        transform: closing ? 'translateX(100%) scale(0.95)' : 'translateX(0) scale(1)',
        opacity: closing ? 0 : 1,
        animation: 'toastSlideIn 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Left accent bar */}
      <div style={{ position: 'absolute', left: 0, top: '10%', height: '80%', width: '3px', background: cfg.accent, borderRadius: '0 3px 3px 0' }} />

      <Icon size={18} style={{ color: cfg.accent, flexShrink: 0, marginTop: '1px' }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#f1ede2', lineHeight: '1.3' }}>{t.title}</p>
        {t.message && (
          <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#8892a4', lineHeight: '1.5' }}>{t.message}</p>
        )}
      </div>

      <button
        onClick={() => onDismiss(t.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4a5568', padding: '2px', flexShrink: 0, lineHeight: 1 }}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
