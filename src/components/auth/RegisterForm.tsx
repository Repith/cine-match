'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useRegister';

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
      onSuccess: () => {
        toast({
          title: 'Registration successful',
          description: 'Welcome to CineMatch!',
        });
        router.push('/');
      },
      onError: (error: unknown) => {
        const message = (error as Error).message || 'Registration failed';
        toast({ title: 'Error', description: message, variant: 'destructive' });
      },
    });
  };

  return (
    <Card className="max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <Input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;