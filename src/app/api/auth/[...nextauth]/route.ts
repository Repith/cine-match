import NextAuth, { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { UserRepository } from '@/backend/database/repositories/user.repository';
import connectToDatabase from '@/backend/MongoConnection';
import { JWT } from 'next-auth/jwt';

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDatabase();
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Invalid credentials');
        }

        const user = await UserRepository.getByEmailOrUsername(
          credentials.email,
        );
        if (!user) {
          throw new Error('No user found');
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id?.toString() ?? 'Unknown User ID',
          username: user.username ?? 'Unknown Username',
          email: user.email ?? 'Unknown Email',
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        username: token.username,
        email: token.email,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
