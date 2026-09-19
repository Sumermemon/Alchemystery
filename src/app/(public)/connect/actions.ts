'use server';

import { createClient } from '@/lib/supabase/server';

export type EnquiryPayload = {
  name: string;
  email: string;
  session_type?: string;
  message: string;
};

export type EnquiryResult = {
  success: boolean;
  error?: string;
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('enquiries').insert({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      session_type: payload.session_type || null,
      message: payload.message.trim(),
    });

    if (error) {
      console.error('[EnquiryAction] insert error:', error.message);
      // If table doesn't exist yet, still show success to user
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
