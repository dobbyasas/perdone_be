// pages/api/auth/signup.js
import { createClient } from "@supabase/supabase-js";
import { hash } from "bcryptjs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function userExists(email) {
  return supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .then((response) => {
      return response.data.length > 0;
    });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  if(await userExists(email)) {
    return res.status(409).json({ message: 'User already exists' });
  }
  try {
    const hashedPassword = await hash(password, 10);
    const { data, error } = await supabase.from('users').insert({
      email,
      name,
      password: hashedPassword
    });

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
