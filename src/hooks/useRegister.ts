import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export function useRegister() {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterData) => {
      const response = await axios.post('/api/auth/register', data);
      return response.data;
    },
  });
}
