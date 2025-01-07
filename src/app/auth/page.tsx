'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleDemoLogin = async () => {
    try {
      const result = await signIn('credentials', {
        redirect: true,
        callbackUrl: '/swipe',
        email: 'demo@cinematch.com',
        password: 'demo123',
      });

      if (!result) {
        console.error('Demo login failed: No result returned');
      }
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  return (
    <div
      className="
        min-h-screen 
        flex items-center justify-center 
        bg-gradient-to-t from-purple-800 via-purple-900 to-purple-950
        px-4
      "
    >
      <div
        className="
          w-full max-w-3xl 
          bg-white dark:bg-gray-900 
          text-gray-800 dark:text-gray-200
          shadow-2xl 
          rounded-lg 
          overflow-hidden 
        "
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-400 mb-4">
            CineMatch
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            Your personal movie matching app
          </p>

          <div className="flex justify-center space-x-4">
            <button
              className={`
                pb-2 px-4 text-lg font-semibold 
                border-b-2 
                ${
                  authMode === 'login'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-purple-600 dark:hover:text-purple-300'
                }
              `}
              onClick={() => setAuthMode('login')}
            >
              Login
            </button>
            <button
              className={`
                pb-2 px-4 text-lg font-semibold
                border-b-2
                ${
                  authMode === 'register'
                    ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-purple-600 dark:hover:text-purple-300'
                }
              `}
              onClick={() => setAuthMode('register')}
            >
              Register
            </button>
          </div>
        </div>

        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          {authMode === 'login' ? <LoginForm /> : <RegisterForm />}

          <div className="mt-4">
            <Button
              onClick={handleDemoLogin}
              variant="outline"
              className="flex items-center gap-2 border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-800"
            >
              <LogIn size={16} />
              Demo Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
