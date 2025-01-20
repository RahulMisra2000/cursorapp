import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white px-8 py-12 shadow">
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-lg bg-indigo-600" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 