import { useState } from 'react';
import axios from 'axios';
import { Movie } from '@/components/providers/MovieProvider';

export const useMoviesFetch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get('/api/movies');
      setMovies((prevMovies) => [...prevMovies, ...response.data.newMovies]);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return { movies, isLoading, error, fetchMovies, setMovies };
};
