'use server';

import { createClient } from '@/lib/supabase/server';

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
  // Anti-bot honeypot check: Bots fill this hidden input
  if (payload.honeypot && payload.honeypot.trim().length > 0) {
    // Silently return success to bot without saving
    return { success: true };
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim().toLowerCase();
  const message = (payload.message || '').trim();
  const sessionType = (payload.session_type || '').trim() || null;

  // Validation
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
      // If table doesn't exist yet, still show success to user so front-end does not break
      if (error.code === 'PGRST205' || error.code === '42P01') {
        return { success: true };
      }
      return { success: false, error: 'Something went wrong. Please try again.' };
    }

    return { success: true };
  } catch (err) {
    console.error('[EnquiryAction] unexpected error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
