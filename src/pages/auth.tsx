import RegisterForm from '@/app/components/auth/RegisterForm';
import LoginForm from '@/app/components/auth/LoginForm';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Auth Page</h1>
      <div className="mb-8">
        <RegisterForm />
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
};

export default AuthPage;
