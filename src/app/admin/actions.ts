'use server';

import { signOut as signOutService } from '@/lib/services/auth.service';
import { redirect } from 'next/navigation';

export async function signOutAction() {
  await signOutService();
  redirect('/admin/login');
}
