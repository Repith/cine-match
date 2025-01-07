'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/swipe');
    }
  }, [status, router]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="
          absolute inset-0
          bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&w=1460&q=80')]
          bg-cover bg-center
        "
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">
          Welcome to CineMatch
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          Swipe through your favorite films. Match with movies you love. Enjoy a
          new way to discover the big screen!
        </p>

        <div className="mt-10">
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
              shadow-lg
              hover:bg-purple-700
              transition-colors
            "
          >
            Get Started
          </a>
        </div>
      </div>

      <div
        className="
          absolute bottom-0 left-0 right-0 h-48
          bg-gradient-to-t from-black/80 to-transparent
        "
      />
    </main>
  );
};

export default LandingPage;
