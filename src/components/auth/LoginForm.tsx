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
    <Card className="max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            placeholder="Username or Email"
            {...register('identifier', {
              required: 'Username or Email is required',
            })}
          />
          {errors.identifier && (
            <p className="text-red-500">{errors.identifier.message}</p>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
