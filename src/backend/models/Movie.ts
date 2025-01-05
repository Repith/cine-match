import mongoose, { Schema, Document } from 'mongoose';

interface IMovie extends Document {
  movieId: string;
  title: string;
  summary: string;
  rating: number;
  imageURL: string;
}

const MovieSchema: Schema = new Schema({
  movieId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String },
  rating: { type: Number },
  imageURL: { type: String },
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
