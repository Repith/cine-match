import axios from 'axios';

export const useMovieActions = () => {
  const likeMovie = async (movieId: string, userId: string) => {
    try {
      await axios.post('/api/movies/like', { movieId, userId });
      console.log(`Liked movieId: ${movieId}`);
    } catch (err) {
      console.error('Failed to like movie:', err);
    }
  };

  const dislikeMovie = async (movieId: string, userId: string) => {
    try {
      await axios.post('/api/movies/dislike', { movieId, userId });
      console.log(`Disliked movieId: ${movieId}`);
    } catch (err) {
      console.error('Failed to dislike movie:', err);
    }
  };

  return { likeMovie, dislikeMovie };
};
