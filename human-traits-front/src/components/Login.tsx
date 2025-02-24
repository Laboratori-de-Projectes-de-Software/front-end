import Footer from "./Footer";
import { useState } from "react";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
  
  interface ButtonProps {
    text: string;
    onClick?: () => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
    <button
      onClick={onClick}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
    >
      {text}
    </button>
  );

  

export default function Login(){
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`${isSignUp ? "Registrando" : "Iniciando sesión"} con: ${username}`);
    };
  
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">
            {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
          </h2>
          <form onSubmit={handleSubmit}>
            <InputField label="Nombre de Usuario" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <InputField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button text={isSignUp ? "Registrarse" : "Ingresar"} />
          </form>
          <p className="mt-4 text-center">
            {isSignUp ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}
            <button
              className="text-blue-500 hover:underline ml-1"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>
      </div>
    );
  
}