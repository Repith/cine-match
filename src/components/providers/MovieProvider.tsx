'use client';

import { useEffect, useState } from 'react';
import Loader from '../layout/Loader';
import { useSession } from 'next-auth/react';
import { useMoviesFetch } from '@/hooks/useMoviesFetch';
import { useMovieActions } from '@/hooks/useMovieActions';

export type Movie = {
  movieId: string;
  title: string;
  summary: string;
  rating: number;
  imageURL: string;
};

type MoviesProviderProps = {
  children: (
    movies: Movie[],
    currentIndex: number,
    handleSwipe: (direction: 'left' | 'right', movieId: string) => void,
  ) => React.ReactNode;
};

const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const { data: session } = useSession();
  const { movies, isLoading, error, fetchMovies } = useMoviesFetch();
  const { likeMovie, dislikeMovie } = useMovieActions();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSwipe = (direction: 'left' | 'right', movieId: string) => {
    const userId = session?.user?.id;
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);

    if (direction === 'right') {
      likeMovie(movieId, userId);
    } else {
      dislikeMovie(movieId, userId);
    }

    if (currentIndex >= movies.length - 3) {
      fetchMovies();
    }
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={fetchMovies}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );

  return <>{children(movies, currentIndex, handleSwipe)}</>;
};

export default MoviesProvider;
