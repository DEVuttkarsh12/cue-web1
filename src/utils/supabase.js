// src/utils/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qxrniibbartyqzktoiqj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cm5paWJiYXJ0eXF6a3RvaXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjQwNDcsImV4cCI6MjA3MjkwMDA0N30.rQSDKLq1ufVA1i4f29Gzt3j4puZybww28FYLne2SUIE";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to add to waitlist
export async function addToWaitlist(email, userId) {
  const { data, error } = await supabase.from("waitlist").insert([
    {
      email: email,
      user_id: userId,
      joined_at: new Date().toISOString(),
    },
  ]);

  return { data, error };
}
