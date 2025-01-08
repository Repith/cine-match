'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Film, Heart, Search } from 'lucide-react';
import InfoTile from '@/components/layout/Block';

const LandingPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/swipe');
    }
  }, [status, router]);

  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-950 overflow-hidden text-gray-800 dark:text-gray-100">
      <section className="relative w-full flex items-center justify-center min-h-[60vh] py-12 px-4 bg-gradient-to-r from-purple-500 to-purple-700">
        <div className="absolute inset-0 bg-purple-500/30 dark:bg-purple-900/40 mix-blend-multiply pointer-events-none" />
        <div className="relative z-10 max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to CineMatch
          </h1>
          <p className="mt-4 text-lg md:text-xl text-purple-100">
            Your Tinder-like platform for movies. Swipe, match, and discover new
            favorites!
          </p>
          <div className="mt-8">
            <a
              href="/auth"
              className="inline-block bg-white text-purple-700 px-8 py-4 text-lg font-semibold rounded-md 
                shadow-lg hover:bg-purple-50 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="relative w-full px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400">
            How It Works
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our simple steps to find your perfect movie match
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <InfoTile
              icon={
                <Film className="w-12 h-12 text-purple-600 dark:text-purple-400" />
              }
              title={'Browse'}
              text={
                'Discover a wide range of movies—from timeless classics to latest blockbusters.'
              }
            />

            <InfoTile
              icon={<Heart className="w-12 h-12 text-red-500" />}
              title={'Swipe & Match'}
              text={
                'Like what you see? Swipe right! Not your type? Swipe left. Quickly build your personalized watchlist.'
              }
            />

            <InfoTile
              icon={<Search className="w-12 h-12 text-green-600" />}
              title={'Discover'}
              text={
                ' Find hidden gems, track trending releases, and save your favorite picks.'
              }
            />
          </div>
        </div>
      </section>

      <section className="relative w-full bg-gray-100 dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-400">
            Ready to Start?
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            Sign in and start swiping through our curated selection of movies.
          </p>
          <div className="mt-8">
            <a
              href="/auth"
              className="
                inline-block
                bg-purple-600 
                text-white 
                px-8 py-3 
                text-lg 
                font-semibold 
                rounded-md 
                shadow
                hover:bg-purple-700
                transition-colors
              "
            >
              Join Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
