import User from '../database/models/User';
import { MovieRepository } from '../database/repositories/movie.repository';
import tmdbService from './tmdb.service';

const movieService = {
  async saveMovies(movies: any[]) {
    const existingMovies = await MovieRepository.getAll();
    const existingIds = existingMovies.map((movie) => movie.movieId);

    const newMovies = movies.filter(
      (movie) => !existingIds.includes(movie.id.toString()),
    );

    const formattedMovies = newMovies.map((movie) => ({
      movieId: movie.id.toString(),
      title: movie.title,
      summary: movie.overview,
      rating: movie.vote_average,
      imageURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));

    return MovieRepository.saveMany(formattedMovies);
  },

  async getSwipeableMovies(userId: string, limit: number = 10) {
    const user = await User.findById(userId);
    const excludedMovieIds = [
      ...(user?.likedMovies || []),
      ...(user?.dislikedMovies || []),
    ];

    // Pobieramy filmy do swipowania
    let movies = await MovieRepository.getSwipeableMovies(
      excludedMovieIds,
      limit,
    );

    // Jeśli nie ma wystarczającej liczby filmów, dociągamy nowe z TMDB
    if (movies.length < limit) {
      const additionalMovies = await tmdbService.getMoviesToSwipe(25);
      await this.saveMovies(additionalMovies);

      // Pobieramy ponownie po zapisaniu nowych filmów
      movies = await MovieRepository.getSwipeableMovies(
        excludedMovieIds,
        limit,
      );
    }

    return movies;
  },
};

export default movieService;
