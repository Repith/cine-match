import User, { UserDocument } from '@/backend/database/models/User';

export const UserRepository = {
  async getById(userId: string): Promise<UserDocument | null> {
    return User.findById(userId).exec();
  },

  async getByEmail(email: string): Promise<UserDocument | null> {
    return User.findOne({ email }).exec();
  },

  async create(userData: Partial<UserDocument>): Promise<UserDocument> {
    const user = new User(userData);
    return user.save();
  },

  async addLikedMovie(
    userId: string,
    movieId: string,
  ): Promise<UserDocument | null> {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { likedMovies: movieId } },
      { new: true },
    ).exec();
  },

  async addDislikedMovie(
    userId: string,
    movieId: string,
  ): Promise<UserDocument | null> {
    return User.findByIdAndUpdate(
      userId,
      { $addToSet: { dislikedMovies: movieId } },
      { new: true },
    ).exec();
  },

  async getUserPreferences(
    userId: string,
  ): Promise<Pick<UserDocument, 'likedMovies' | 'dislikedMovies'> | null> {
    return User.findById(userId).select('likedMovies dislikedMovies').exec();
  },
};
