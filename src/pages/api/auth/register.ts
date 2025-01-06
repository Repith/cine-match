import { UserRepository } from '@/backend/database/repositories/user.repository';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/backend/MongoConnection';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await connectToDatabase();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserRepository.create({
      username,
      email,
      password: hashedPassword,
      likedMovies: [],
      dislikedMovies: [],
    });

    res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
