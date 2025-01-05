import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  likedMovies: string[];
  dislikedMovies: string[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedMovies: [{ type: String }],
  dislikedMovies: [{ type: String }],
});

export default mongoose.model<IUser>('User', UserSchema);
