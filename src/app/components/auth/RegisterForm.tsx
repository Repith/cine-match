import { useForm, SubmitHandler } from 'react-hook-form';

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('User registered successfully!');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const password = watch('password', '');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      {/* Username Field */}
      <input
        type="text"
        placeholder="Username"
        {...register('username', {
          required: 'Username is required',
          minLength: {
            value: 3,
            message: 'Username must be at least 3 characters',
          },
        })}
        className="border p-2 mb-2 w-full"
      />
      {errors.username && (
        <p className="text-red-500">{errors.username.message}</p>
      )}

      {/* Email Field */}
      <input
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        })}
        className="border p-2 mb-2 w-full"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      {/* Password Field */}
      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        className="border p-2 mb-2 w-full"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      {/* Confirm Password Field */}
      <input
        type="password"
        placeholder="Confirm Password"
        {...register('confirmPassword', {
          validate: (value) => value === password || 'Passwords do not match',
        })}
        className="border p-2 mb-2 w-full"
      />
      {errors.confirmPassword && (
        <p className="text-red-500">{errors.confirmPassword.message}</p>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
