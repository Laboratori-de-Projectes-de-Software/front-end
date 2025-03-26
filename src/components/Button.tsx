import React from "react";
import "./Button.css"; // Agrega estilos según sea necesario

interface ButtonProps {
    label: string;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
    return (
        <button onClick={onClick} className={`button ${className}`}>
            {label}
        </button>
    );
};

export default Button;
