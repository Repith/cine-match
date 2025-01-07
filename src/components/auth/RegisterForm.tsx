'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useRegister';
import { signIn } from 'next-auth/react';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { toast } = useToast();
  const { mutate } = useRegister();
  const router = useRouter();
  const password = watch('password', '');

  const onSubmit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: async () => {
        toast({
          title: 'Registration successful',
          description: 'Welcome to CineMatch!',
        });

        const signInResult = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResult?.error) {
          toast({
            title: 'Login failed',
            description: signInResult.error,
            variant: 'destructive',
          });
        } else {
          router.push('/');
        }
      },
      onError: (error: unknown) => {
        const message = (error as Error).message || 'Registration failed';
        toast({ title: 'Error', description: message, variant: 'destructive' });
      },
    });
  };

  return (
    <Card className="max-w-md w-full shadow-md border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-purple-600 dark:text-purple-400">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            className="
              focus-visible:ring-2 focus-visible:ring-purple-600 
              focus-visible:border-purple-600
            "
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <Input
            type="email"
            placeholder="Email"
            className="
              focus-visible:ring-2 focus-visible:ring-purple-600 
              focus-visible:border-purple-600
            "
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            className="
              focus-visible:ring-2 focus-visible:ring-purple-600 
              focus-visible:border-purple-600
            "
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Input
            type="password"
            placeholder="Confirm Password"
            className="
              focus-visible:ring-2 focus-visible:ring-purple-600 
              focus-visible:border-purple-600
            "
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
