import mongoose, { Schema, Document, Model } from 'mongoose';

export interface MovieDocument extends Document {
  movieId: string;
  title: string;
  summary: string;
  rating: number;
  imageURL: string;
}

const MovieSchema: Schema = new Schema({
  movieId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  rating: { type: Number, required: true },
  imageURL: { type: String, required: true },
});

const Movie: Model<MovieDocument> =
  mongoose.models.Movie || mongoose.model<MovieDocument>('Movie', MovieSchema);

export default Movie;
