import React from 'react';

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
              className="mt-8 bg-[var(--btn-bkg)] text-black font-bold px-4 py-2 rounded-lg"
            >
              Login
            </a>
            <a
              href="/register"
              className="mt-8 bg-[var(--btn-bkg)] text-black font-bold px-4 py-2 rounded-lg"
            >
              Register
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default WelcomePage;