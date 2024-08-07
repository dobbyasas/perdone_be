export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle sign-in error
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }