import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { UserRepository } from '@/backend/database/repositories/user.repository';
import connectToDatabase from '@/backend/MongoConnection';

export const POST = async (req: Request) => {
  try {
    await connectToDatabase();
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserRepository.create({
      username,
      email,
      password: hashedPassword,
      likedMovies: [],
      dislikedMovies: [],
    });

    return NextResponse.json(
      { message: 'User created', user: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
};
