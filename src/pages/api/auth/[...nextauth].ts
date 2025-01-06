import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { UserRepository } from '@/backend/database/repositories/user.repository';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }
        const user = await UserRepository.getByEmail(credentials.email);
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

        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
