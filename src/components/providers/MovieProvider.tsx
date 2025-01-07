'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loader from '../layout/Loader';

import { useMoviesQuery } from '@/hooks/useMoviesQuery';
import { useDislikeMovie, useLikeMovie } from '@/hooks/useMovieActions';

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
    handleSwipe: (direction: 'left' | 'right', movieId: string) => void,
  ) => React.ReactNode;
};

const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const { data: session } = useSession();
  const { mutate: likeMovie } = useLikeMovie();
  const { mutate: dislikeMovie } = useDislikeMovie();

  const {
    data: fetchedMovies,
    isLoading,
    error,
    refetch: fetchMovies,
  } = useMoviesQuery(session?.user.id || '');

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (fetchedMovies && fetchedMovies.length > 0) {
      setMovies((prev) => {
        const newMovies = [...prev];
        fetchedMovies.forEach((movie) => {
          if (!newMovies.some((m) => m.movieId === movie.movieId)) {
            newMovies.push(movie);
          }
        });
        return newMovies;
      });
    }
  }, [fetchedMovies]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchMovies();
    }
  }, [movies, fetchMovies]);

  const handleSwipe = (direction: 'left' | 'right', movieId: string) => {
    const userId = session?.user?.id;
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    setMovies((prevMovies) => prevMovies.filter((m) => m.movieId !== movieId));

    if (movies.length <= 3) {
      fetchMovies();
    }

    if (direction === 'right') {
      likeMovie({ movieId, userId });
    } else {
      dislikeMovie({ movieId, userId });
    }
  };

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{(error as Error).message}</p>
        <button
          onClick={() => fetchMovies()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return <>{children(movies, handleSwipe)}</>;
};

export default MoviesProvider;
