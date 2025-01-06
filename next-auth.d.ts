import NextAuth from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string;
      email: string;
    };
  }

  export interface JWT {
    id: string;
    email: string;
  }
}
