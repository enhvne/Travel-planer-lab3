// pages/api/user.js
import { NextRequest } from 'next/server';

export default function handler(req, res) {

  const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/images/profile.png',
      joinedDate: 'January 2024',
      savedTours: 12,
      completedTours: 5,
  };

  if (req.method === 'GET'){
    res.status(200).json(user);

  } else if (req.method === 'POST') {

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    res.status(201).json({
      message: 'User created successfully',
      user: {
        name,
        email,
        avatar: '/images/default.png',
        joinedDate: 'May 2025',
        savedTours: 0,
        completedTours: 0,
      },
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
  