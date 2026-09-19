import { createClient } from '@/lib/supabase/server';
import type { EnquiryRow, EnquiryStatus } from '@/types/database.types';

/**
 * Enquiry repository — handles enquiries submitted via /connect.
 * Gracefully handles cases where the enquiries migration hasn't been run yet.
 */

export interface GetEnquiriesResult {
  enquiries: EnquiryRow[];
  tableMissing: boolean;
}

export async function getEnquiries(statusFilter?: EnquiryStatus): Promise<GetEnquiriesResult> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (statusFilter) {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      if (error.code === '42P01' || error.code === 'PGRST205') {
        return { enquiries: [], tableMissing: true };
      }
      console.error('[EnquiryRepository] getEnquiries error:', error.message);
      return { enquiries: [], tableMissing: false };
    }

    return { enquiries: (data as EnquiryRow[]) ?? [], tableMissing: false };
  } catch (err) {
    if ((err as { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    console.error('[EnquiryRepository] getEnquiries exception:', err);
    return { enquiries: [], tableMissing: false };
  }
}

export async function getEnquiryById(id: string): Promise<EnquiryRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.code === '42P01' || error.code === 'PGRST205') {
        return null;
      }
      console.error('[EnquiryRepository] getEnquiryById error:', error.message);
      return null;
    }

    return (data as EnquiryRow) ?? null;
  } catch (err) {
    if ((err as { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    console.error('[EnquiryRepository] getEnquiryById exception:', err);
    return null;
  }
}

export async function getUnreadEnquiriesCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');

    if (error) {
      return 0;
    }

    return count ?? 0;
  } catch (err) {
    if ((err as { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    return 0;
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('enquiries')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function deleteEnquiry(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}
