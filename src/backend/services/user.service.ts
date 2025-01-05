import { UserRepository } from '../database/repositories/user.repository';

export const UserService = {
  async addLikedMovie(userId: string, movieId: string) {
    return UserRepository.addLikedMovie(userId, movieId);
  },

  async addDislikedMovie(userId: string, movieId: string) {
    return UserRepository.addDislikedMovie(userId, movieId);
  },

  async getUserPreferences(userId: string) {
    return UserRepository.getUserPreferences(userId);
  },
};
