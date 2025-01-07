'use client';

import { AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import MoviesProvider from '@/components/providers/MovieProvider';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
      {(movies, currentIndex, handleSwipe) => (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="relative w-80 h-[500px] sm:w-[450px] sm:h-[650px]">
            <AnimatePresence>
              {movies
                .slice(currentIndex, currentIndex + 3)
                .map((movie, index) => (
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
