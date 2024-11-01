// src/supabase.js
import { createClient } from '@supabase/supabase-js';

console.log(process.env.VUE_APP_API_URL);
const supabaseUrl = process.env.VUE_APP_API_URL; // Replace with your Supabase project URL
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
