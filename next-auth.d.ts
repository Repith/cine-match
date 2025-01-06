import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    username: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
    };
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
  }
}
