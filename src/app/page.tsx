'use client';

import { useSession, signOut } from 'next-auth/react';

const HomePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="w-full bg-blue-500 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">CineMatch</h1>
        {status === 'authenticated' ? (
          <div className="mt-4">
            <p>
              Welcome,{' '}
              <strong>{session.user?.email || session.user?.id}</strong>!
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
      </header>

      <main className="p-8 text-center">
        <h2 className="text-xl font-semibold">
          Start swiping your favorite movies!
        </h2>
        <p className="mt-4">Log in to discover more.</p>
      </main>
    </div>
  );
};

export default HomePage;
