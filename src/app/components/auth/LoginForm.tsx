import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

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

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert('Login successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {/* Identifier Field */}
      <input
        type="text"
        placeholder="Username or Email"
        {...register('identifier', {
          required: 'Username or Email is required',
        })}
        className="border p-2 mb-2 w-full"
      />
      {errors.identifier && (
        <p className="text-red-500">{errors.identifier.message}</p>
      )}

      {/* Password Field */}
      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
        })}
        className="border p-2 mb-2 w-full"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button type="submit" className="bg-green-500 text-white p-2 w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
