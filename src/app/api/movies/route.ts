import connectToDatabase from '@/backend/MongoConnection';
import Movie from '@/backend/database/models/Movie';
import User from '@/backend/database/models/User';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 },
      );
    }

    const user = await User.findById(userId).select(
      'likedMovies dislikedMovies',
    );
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const excludedMovieIds = [
      ...(user.likedMovies || []),
      ...(user.dislikedMovies || []),
    ];

    const movies = await Movie.find({ movieId: { $nin: excludedMovieIds } })
      .skip(offset)
      .limit(limit)
      .sort({ _id: -1 });

    return NextResponse.json({
      message: 'Movies fetched successfully',
      movies,
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error },
      { status: 500 },
    );
  }
}
