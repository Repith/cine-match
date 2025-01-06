import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  likedMovies: string[];
  dislikedMovies: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedMovies: [{ type: String }],
  dislikedMovies: [{ type: String }],
});

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;
