'use client';

import { AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MoviesProvider, { Movie } from '@/components/providers/MovieProvider';
import SwipeCard from './SwipeCard';

const SwipeStack = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <MoviesProvider>
      {(movies: Movie[], handleSwipe) => (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="md:pt-4 relative w-80 h-[500px] sm:w-[450px] sm:h-[600px]">
            <AnimatePresence>
              {movies.slice(0, 3).map((movie, index) => (
                <SwipeCard
                  key={movie.movieId}
                  movie={movie}
                  onSwipe={handleSwipe}
                  isTopCard={index === 0}
                />
              ))}
            </AnimatePresence>
          </div>
        </main>
      )}
    </MoviesProvider>
  );
};

export default SwipeStack;
