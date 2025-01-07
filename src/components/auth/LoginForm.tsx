'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';

type LoginFormData = {
  identifier: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const { toast } = useToast();
  const { mutate } = useLogin();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    mutate(
      { email: data.identifier, password: data.password },
      {
        onSuccess: () => {
          toast({ title: 'Login successful', description: 'Welcome back!' });
          router.push('/');
        },
        onError: (error: unknown) => {
          const message = (error as Error).message || 'Login failed';
          toast({
            title: 'Login failed',
            description: message,
            variant: 'destructive',
          });
        },
      },
    );
  };

  return (
    <Card className="max-w-md w-full shadow-md border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-purple-600 dark:text-purple-400">
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Username or Email"
            className="
              focus-visible:ring-2 focus-visible:ring-purple-600 
              focus-visible:border-purple-600
            "
            {...register('identifier', {
              required: 'Username or Email is required',
            })}
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm">{errors.identifier.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            className="
              focus-visible:ring-2 focus-visible:ring-purple-600 
              focus-visible:border-purple-600
            "
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
