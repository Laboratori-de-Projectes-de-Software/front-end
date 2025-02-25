import Footer from "./Footer";
import { useState } from "react";
import { Link } from "react-router";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange}/>
    </div>
  );
  
  interface ButtonProps {
    text: string;
    onClick?: () => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
    <button onClick={onClick}>
      {text}
    </button>
  );

  

export default function Login(){
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_check, checkPassword] = useState("");
  
    return (
      <>
      <div className="general_container">
        <Footer />
        <div className="login_content">
          <h2>{isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}</h2>
          <form>
            <div className="input_group">
              <InputField label="Nombre de Usuario " type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <InputField label="Contraseña " type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {isSignUp && <InputField label="Confirmar contraseña " type="password" value={password_check} onChange={(e) => checkPassword(e.target.value)} />}
            </div>
            <Link to="/account">
              <Button text={isSignUp ? "Registrarse" : "Ingresar"} />
            </Link>
          </form>
          <p>{isSignUp ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta?"}</p>
          <button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Inicia sesión" : "Regístrate"}
          </button>
        </div>
      </div>
      </>
    );
  
}