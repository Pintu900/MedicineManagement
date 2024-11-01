// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qtdppmkhcsmjntjygvxn.supabase.co'; // Replace with your Supabase project URL
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0ZHBwbWtoY3Ntam50anlndnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NTY0MTIsImV4cCI6MjA0NTUzMjQxMn0.7XZlq07QmSOCk3-z8FtqLjhghMjJfVbpOFI43OjvkMg'; // Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
