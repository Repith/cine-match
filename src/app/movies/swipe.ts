import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/backend/MongoConnection';
import movieService from '@/backend/services/movie.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { userId } = req.query;
      const movies = await movieService.getSwipeableMovies(userId as string);
      return res.status(200).json(movies);
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error in swipe endpoint:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}
