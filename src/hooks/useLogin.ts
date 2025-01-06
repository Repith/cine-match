import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

type LoginData = {
  email: string;
  password: string;
};

export function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginData) => {
      const result = await signIn('credentials', { redirect: false, ...data });
      if (result?.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });
}
