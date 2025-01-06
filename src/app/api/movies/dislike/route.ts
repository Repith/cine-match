import { UserService } from '@/backend/services/user.service';

export async function POST(req: Request) {
  const { movieId, userId } = await req.json();
  await UserService.addDislikedMovie(userId, movieId);
  return new Response(JSON.stringify({ message: 'Movie disliked!' }), {
    status: 200,
  });
}
