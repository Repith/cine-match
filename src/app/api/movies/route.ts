import connectToDatabase from '@/backend/MongoConnection';
import Movie from '@/backend/database/models/Movie';
import tmdbService from '@/backend/services/tmdb.service';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();

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

    return NextResponse.json({
      message: 'Movies saved to MongoDB',
      newMovies: moviesToSave,
    });
  } catch (error) {
    console.error('Error in movies endpoint:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 },
    );
  }
}
