'use client';

import { useSession, signOut } from 'next-auth/react';
import AppNavbar from '../components/layout/Navbar';
import UserProfile from '../components/layout/UserProfile';

const HomePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
          CineMatch
        </h1>
        {status === 'authenticated' ? (
          <div className="text-center">
            <p>
              Welcome, <strong>{session.user?.username}</strong>!
            </p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
            >
              Log out
            </button>
          </div>
        ) : (
          <p className="mt-4">You are not logged in.</p>
        )}

        <UserProfile />

        <h2 className="text-xl font-semibold mt-8">
          Start swiping your favorite movies!
        </h2>

        <p className="mt-4">Log in to discover more.</p>
      </main>
    </div>
  );
};

export default HomePage;
