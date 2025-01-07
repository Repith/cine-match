'use client';

import { motion } from 'framer-motion';
import { Star, Heart, X } from 'lucide-react';
import { useState } from 'react';

type Movie = {
  movieId: string;
  title: string;
  summary: string;
  rating: number;
  imageURL: string;
};

type SwipeCardProps = {
  movie: Movie;
  onSwipe: (direction: 'left' | 'right', movieId: string) => void;
  isTopCard: boolean;
};

const SwipeCard = ({ movie, onSwipe, isTopCard }: SwipeCardProps) => {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  );

  const swipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    onSwipe(direction, movie.movieId);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 150) {
      swipe('right');
    } else if (info.offset.x < -150) {
      swipe('left');
    }
  };

  return (
    <motion.div
      className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden cursor-grab"
      style={{
        zIndex: isTopCard ? 10 : 9,
        rotate: isTopCard ? 0 : Math.random() > 0.5 ? 5 : -5,
      }}
      drag={isTopCard ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTopCard ? handleDragEnd : undefined}
      whileTap={{ scale: 1.05 }}
      initial={{ scale: 1, opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        x: swipeDirection === 'right' ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.5 },
      }}
    >
      <img
        src={movie.imageURL}
        alt={movie.title}
        className="w-full h-3/5 object-cover pointer-events-none"
        draggable="false"
      />
      <div className="p-4">
        <div className="flex justify-between mt-2">
          <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {movie.title}
          </h3>
          <div className="flex">
            <Star fill="#facc15" className="text-yellow-500" />
            <span className="ml-1 text-gray-700 dark:text-gray-300">
              {movie.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
          {movie.summary}
        </p>
      </div>
      <div className="absolute bottom-4 flex justify-around w-full p-4">
        <button
          onClick={() => swipe('left')}
          className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition-all"
        >
          <X size={24} />
        </button>
        <button
          onClick={() => swipe('right')}
          className="bg-green-500 text-white p-2 rounded-full hover:scale-110 transition-all"
        >
          <Heart size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
