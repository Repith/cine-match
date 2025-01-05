import Movie, { MovieDocument } from '@/backend/database/models/Movie';

export const MovieRepository = {
  async getAll(): Promise<MovieDocument[]> {
    return Movie.find().exec();
  },

  async saveMany(movies: Partial<MovieDocument>[]): Promise<MovieDocument[]> {
    return Movie.insertMany(movies) as Promise<MovieDocument[]>;
  },

  async getSwipeableMovies(
    excludedMovieIds: string[],
    limit: number,
  ): Promise<MovieDocument[]> {
    return Movie.find({ movieId: { $nin: excludedMovieIds } })
      .limit(limit)
      .exec();
  },
};
