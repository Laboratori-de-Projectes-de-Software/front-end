import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSignUp } from '@use-cases/UseCases';
import WhiteButton from '@components/WhiteButton';

const RegisterPage: React.FC = () => {
  const [user, setUser] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');
  const navigate = useNavigate();

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== rPassword) {
      alert("Les contrasenyes no coincideixen");
      return;
    }

   userSignUp({user, mail, password });
   
  };

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--secondary)">
      <div className="bg-(--primary) text-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <form onSubmit={enviar}>
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Name:
            </label>
            <input
              type="Name"
              id="Name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-3 rounded-lg bg-(--input-bkg) border-none"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-(--input-bkg) border-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Repeat password:
            </label>
            <input
              type="password"
              id="password"
              value={rPassword}
              onChange={(e) => setRPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-(--input-bkg) border-none"
            />
          </div>
          <WhiteButton type="submit" className="w-full">Register</WhiteButton>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Have an account?{' '}
            <a href="/login" className="text-(--color-blue) hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
