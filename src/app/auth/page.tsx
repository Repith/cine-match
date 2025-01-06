'use client';

import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Auth Page</h1>
      <div className="space-y-8 flex gap-4">
        <RegisterForm />
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;
