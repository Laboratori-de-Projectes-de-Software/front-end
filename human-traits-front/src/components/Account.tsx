import Footer from "./Footer";
import SideBar from"./SideBar";
import { useState } from "react";
import Usuario from "../assets/icono_usuario.png";

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

  export default function Account(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
        <div className="general-container">
            <div className="account_container">        
                <SideBar/>
                <div className="account_content">
                    <div className="account_save">
                    <h2> Account Settings</h2>
                        <img src={Usuario} alt="Representación visual del usuario" className="imagen_usuario"/>
                        <div className="input_group">
                          <form>
                              <InputField label="Cambiar nombre " type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                              <InputField label="Cambiar contraseña " type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                              <Button text="Save"/>
                          </form>
                        </div>
                    </div>
                    <div className="IAs_container">

                    </div>
                </div>
            </div>
            <Footer/>
        </div>
        </>
    )
  }