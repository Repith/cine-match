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
      className="
        absolute w-full h-full
        bg-white dark:bg-gray-800
        rounded-2xl
        shadow-xl
        overflow-hidden
        cursor-grab
      "
      style={{
        zIndex: isTopCard ? 10 : 9,
        rotate: isTopCard ? 0 : Math.random() > 0.5 ? 3 : -3,
      }}
      drag={isTopCard ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={isTopCard ? handleDragEnd : undefined}
      whileTap={{ scale: 1.03 }}
      initial={{ scale: 1, opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        x: swipeDirection === 'right' ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.5 },
      }}
    >
      <div className="relative w-full h-3/5">
        <img
          src={movie.imageURL}
          alt={movie.title}
          className="w-full h-full object-cover pointer-events-none rounded-t-2xl"
          draggable="false"
        />
        <div
          className="
            absolute bottom-0 left-0 right-0 h-1/2
            bg-gradient-to-t from-black/70 to-transparent
            rounded-t-2xl
          "
        />
      </div>

      <div className="relative -mt-8 p-4 text-white">
        <div
          className="
            bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-200
            rounded-2xl shadow-md p-4
          "
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {movie.title}
            </h3>
            <div className="flex items-center">
              <Star fill="#facc15" className="text-yellow-500" />
              <span className="ml-1">{movie.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm leading-snug line-clamp-3 md:line-clamp-5">
            {movie.summary}
          </p>
        </div>
      </div>

      <div
        className="
          absolute bottom-4 w-full px-8
          flex items-center justify-between
        "
      >
        <button
          onClick={() => swipe('left')}
          className="
            md:w-14 md:h-14 w-10 h-10
            flex items-center justify-center 
            bg-red-500 text-white 
            rounded-full 
            shadow-lg 
            hover:bg-red-600 
            hover:scale-110
            active:scale-100 
            transition-transform 
            ease-in-out
          "
        >
          <X size={28} />
        </button>
        <button
          onClick={() => swipe('right')}
          className="
            md:w-14 md:h-14 w-10 h-10
            flex items-center justify-center
            bg-green-500 text-white
            rounded-full
            shadow-lg
            hover:bg-green-600
            hover:scale-110
            active:scale-100
            transition-transform
            ease-in-out
          "
        >
          <Heart size={28} />
        </button>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
