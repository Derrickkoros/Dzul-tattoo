// api/bookings.js
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, artist, placement, idea } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    await sql`
      INSERT INTO bookings (name, email, artist, placement, idea)
      VALUES (${name}, ${email}, ${artist}, ${placement}, ${idea})
    `;
    return res.status(201).json({ message: 'Booking saved.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error.' });
  }
}