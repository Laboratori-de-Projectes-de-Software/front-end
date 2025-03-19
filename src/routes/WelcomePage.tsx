import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8">Welcome</h1>
        <p className="text-lg text-center">
          This is a simple tournament management system.
          Posar botons per anar a Login i Register.
        </p>
      </main>
    </div>
  );
}; 

export default WelcomePage;