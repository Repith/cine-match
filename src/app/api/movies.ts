// Importujemy wymagane moduły
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/backend/MongoConnection';
import Movie from '@/backend/database/models/Movie';
import tmdbService from '@/backend/services/tmdb.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const popularMovies = await tmdbService.getMoviesToSwipe();

      const savedMovies = await Movie.find();
      const savedMovieIds = savedMovies.map((movie) => movie.movieId);

      const newMovies = popularMovies.filter(
        (movie: any) => !savedMovieIds.includes(String(movie.id)),
      );

      const moviesToSave = newMovies.map((movie: any) => ({
        movieId: String(movie.id),
        title: movie.title,
        summary: movie.overview,
        rating: movie.vote_average,
        imageURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      }));

      await Movie.insertMany(moviesToSave);

      return res
        .status(200)
        .json({ message: 'Movies saved to MongoDB', newMovies: moviesToSave });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error in movies endpoint:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}
