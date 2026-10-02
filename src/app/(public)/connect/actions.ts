'use server';

import { createClient } from '@/lib/supabase/server';
import { getSiteSettings } from '@/lib/repositories/settings.repository';
import { sendLeadNotificationEmail } from '@/lib/services/email.service';

export type EnquiryPayload = {
  name: string;
  email: string;
  session_type?: string;
  message: string;
  honeypot?: string;
};

export type EnquiryResult = {
  success: boolean;
  error?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  // Anti-bot honeypot check
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    return { success: true };
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim().toLowerCase();
  const message = (payload.message || '').trim();
  const sessionType = (payload.session_type || '').trim() || null;

  if (name.length < 2) {
    return { success: false, error: 'Please provide your name.' };
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return { success: false, error: 'Please provide a valid email address.' };
  }
  if (message.length < 5) {
    return { success: false, error: 'Please write a brief message (at least 5 characters).' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('enquiries').insert({
      name,
      email,
      session_type: sessionType,
      message,
    });

    if (error) {
      console.error('[EnquiryAction] insert error:', error.message);
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return { success: true };
      }
      return { success: false, error: 'Something went wrong. Please try again.' };
    }

    // Send lead notification — non-blocking, never surfaces errors to the user
    try {
      const settings = await getSiteSettings();
      const toEmail = (settings.contact_email as string) || '';
      if (toEmail) {
        await sendLeadNotificationEmail({
          toEmail,
          visitorName: name,
          visitorEmail: email,
          sessionType,
          message,
          dbSettings: settings, // pass settings so SMTP config is read from DB
        });
      }
    } catch (emailErr) {
      console.error('[EnquiryAction] email notification failed:', emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error('[EnquiryAction] unexpected error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
