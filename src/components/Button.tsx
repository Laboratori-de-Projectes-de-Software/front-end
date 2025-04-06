import React from "react";
import "./Button.css";

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className = "",
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
