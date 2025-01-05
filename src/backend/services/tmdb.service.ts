import axios from 'axios';

const apiKey = process.env.TMDB_API_KEY;
const baseURL = 'https://api.themoviedb.org/3';

const tmdbService = {
  getMovieDetails: async (movieId: string) => {
    const response = await axios.get(
      `${baseURL}/movie/${movieId}?api_key=${apiKey}`,
    );
    return response.data;
  },
  getRecommendations: async () => {
    const response = await axios.get(
      `${baseURL}/movie/popular?api_key=${apiKey}`,
    );
    return response.data.results;
  },
};

export default tmdbService;
