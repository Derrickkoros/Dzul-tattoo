import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, artist, placement, idea } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql(
      'INSERT INTO bookings (name, email, artist, placement, idea) VALUES ($1, $2, $3, $4, $5)',
      [name, email, artist, placement, idea]
    );
    return res.status(201).json({ message: 'Booking saved.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error.' });
  }
}
