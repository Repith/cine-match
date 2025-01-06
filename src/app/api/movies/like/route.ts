import { UserService } from '@/backend/services/user.service';

export async function POST(req: Request) {
  const { movieId, userId } = await req.json();
  await UserService.addLikedMovie(userId, movieId);
  return new Response(JSON.stringify({ message: 'Movie liked!' }), {
    status: 200,
  });
}
