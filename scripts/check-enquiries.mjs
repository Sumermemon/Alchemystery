import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { error } = await supabase.from('enquiries').select('id').limit(1);
if (error && error.code === '42P01') {
  console.log('Table does not exist yet.');
  console.log('Please run the SQL in supabase/migrations/005_enquiries.sql in your Supabase SQL Editor.');
} else if (error) {
  console.log('Unexpected error:', error.message, error.code);
} else {
  console.log('✅ enquiries table exists and is accessible');
}
