'use client';

import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

const AuthPage = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Auth Page</h1>
      <div className="space-y-8 flex gap-4">
        <RegisterForm />
        <LoginForm />
      </div>
      <div className="mt-8">
        <Button
          onClick={handleDemoLogin}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogIn size={16} />
          Demo Login
        </Button>
      </div>
    </div>
  );
};

export default AuthPage;
