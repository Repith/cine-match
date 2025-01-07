import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useLikeMovie = () => {
  return useMutation({
    mutationKey: ['like_movie'],
    mutationFn: async ({
      movieId,
      userId,
    }: {
      movieId: string;
      userId: string;
    }) => {
      await axios.post('/api/movies/like', { movieId, userId });
    },
  });
};

export const useDislikeMovie = () => {
  return useMutation({
    mutationKey: ['dislike_movie'],
    mutationFn: async ({
      movieId,
      userId,
    }: {
      movieId: string;
      userId: string;
    }) => {
      await axios.post('/api/movies/dislike', { movieId, userId });
    },
  });
};
