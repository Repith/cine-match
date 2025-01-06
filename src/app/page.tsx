'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/swipe');
    }
  }, [status, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400">
          Welcome to CineMatch
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Discover your next favorite movie. Swipe, like, and enjoy!
        </p>
        <div className="mt-8">
          <a
            href="/auth"
            className="bg-purple-500 text-white px-6 py-3 rounded-md text-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
