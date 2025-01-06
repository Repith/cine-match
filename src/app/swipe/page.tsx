'use client';

import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import SwipeCard from './SwipeCard';

type Movie = {
  movieId: string;
  title: string;
  summary: string;
  rating: number;
  imageURL: string;
};

const SwipePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies((prevMovies) => [...prevMovies, ...response.data.newMovies]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSwipe = (direction: 'left' | 'right', movieId: string) => {
    setCurrentIndex((prevIndex) => prevIndex + 1);

    const action = direction === 'right' ? 'like' : 'dislike';
    axios.post(`/api/movies/${action}`, { movieId });

    if (currentIndex >= movies.length - 3) {
      fetchMovies();
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="relative w-80 h-[500px]">
        <AnimatePresence>
          {movies.slice(currentIndex, currentIndex + 3).map((movie, index) => (
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
  );
};

export default SwipePage;
