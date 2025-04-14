import React from 'react';
import WhiteButton from '@components/WhiteButton';

const WelcomePage: React.FC = () => {
  const isUserLogged = localStorage.getItem("user") !== null;

  return (
    <div className="min-h-screen bg-[var(--secondary)] text-white">
      <main className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Welcome</h1>
        <p className="text-lg text-center mb-4">
          This is a simple tournament management system.
        </p>

        {!isUserLogged && (
          <div className="flex flex-row items-center gap-4">
            <a
              href="/login"
              className="mt-8"
            >
              <WhiteButton>Log in</WhiteButton>
            </a>
            <a
              href="/register"
              className="mt-8"
            >
              <WhiteButton>Register</WhiteButton>
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default WelcomePage;