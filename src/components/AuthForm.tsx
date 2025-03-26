import React from "react";
import "./AuthForm.css";
import Button from "./Button";

interface AuthFormProps {
    campos: { nombre: string; tipo: string }[];
}

const AuthForm: React.FC<AuthFormProps> = ({ campos }) => {
    return (
        <form className="auth-form">
            {campos.map((campo, index) => (
                <div key={index} className="input-group">
                    <label>{campo.nombre}:</label>
                    <input type={campo.tipo} placeholder={`Ingrese ${campo.nombre}`} required={true}/>
                </div>
            ))}
            <Button onClick={() => { console.log("Formulario enviado"); }} label="Ingresar" className="login-button" />
        </form>
    );
};

export default AuthForm;

