import { Movie } from '@/components/providers/MovieProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useMoviesQuery = (userId: string) => {
  return useQuery({
    retry: 3,
    refetchOnWindowFocus: false,
    queryKey: ['movies'],
    queryFn: async () => {
      const { data } = await axios.get(`/api/movies/?userId=${userId}`);
      return data.movies as Movie[];
    },
  });
};
