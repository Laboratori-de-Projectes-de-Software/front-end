import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--secondary)">
      <div className="bg-(--primary) text-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-lg bg-(--input-bkg) border-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg bg-(--input-bkg) border-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-(--btn-bkg) text-black font-bold p-3 rounded-lg hover:bg-gray-300 transition-colors hover:cursor-pointer"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-(--color-blue) hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
