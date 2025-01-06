import axios from 'axios';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const PAGE_TO_SEARCH_COUNT = 99;
const MOVIES_TO_SWIPE_COUNT = 25;

const tmdbService = {
  async getPopularMovies() {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY },
    });
    return response.data.results;
  },

  async getMovieDetails(movieId: string) {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  },

  async searchMovies(query: string) {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query },
    });
    return response.data.results;
  },

  async getMoviesToSwipe(count: number = MOVIES_TO_SWIPE_COUNT) {
    const randomPage = Math.floor(Math.random() * PAGE_TO_SEARCH_COUNT) + 1;

    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, page: randomPage },
    });

    const movies = response.data.results;
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
};

export default tmdbService;
