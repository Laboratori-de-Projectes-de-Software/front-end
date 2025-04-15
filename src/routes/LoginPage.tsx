import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLoggin } from '@use-cases/UseCases';
import WhiteButton from '@components/WhiteButton';

const LoginPage: React.FC = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token =  JSON.parse(localStorage.getItem("token") || "").token;
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await userLoggin(email, password);
    
    if (res && res.token) {
      alert("Sessió iniciada correctament");
      
      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId.toString());
      localStorage.setItem("user", res.user);
      navigate("/");
    } else {
      alert("Error iniciant sessió. Comprova les credencials.");
    }
  };
 
 
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--secondary)">
      <div className="bg-(--primary) text-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Log In</h1>
        <form onSubmit={enviar}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <WhiteButton type="submit" className="w-full">Log In</WhiteButton>
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
