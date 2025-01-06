import { useSession } from 'next-auth/react';

const UserProfile = () => {
  const { data: session } = useSession();

  if (!session) return <p>Not logged in</p>;

  return (
    <div>
      <p>Username: {session.user?.username}</p>
      <p>Email: {session.user?.email}</p>
    </div>
  );
};

export default UserProfile;
