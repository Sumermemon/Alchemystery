import { createClient } from '@supabase/supabase-js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function run() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error fetching users:', error);
    return;
  }
  
  if (data.users.length === 0) {
    console.log('No users found. Creating admin@alchemystery.in...');
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: 'admin@alchemystery.in',
      password: 'AdminPassword123!',
      email_confirm: true,
      user_metadata: { role: 'super_admin' }
    });
    
    if (createError) {
      console.error('Error creating user:', createError);
    } else {
      console.log('Created user:', newUser.user.email, 'with password: AdminPassword123!');
    }
  } else {
    for (const u of data.users) {
      console.log('Found user:', u.email);
    }
    console.log('Resetting password for the first user to AdminPassword123! just in case...');
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      data.users[0].id,
      { password: 'AdminPassword123!', user_metadata: { role: 'super_admin' } }
    );
    if (updateError) {
      console.error('Error updating password:', updateError);
    } else {
      console.log('Password updated for', data.users[0].email, 'to AdminPassword123!');
    }
  }
}

run().catch(console.error);
