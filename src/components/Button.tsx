import React from "react";
import "./Button.css";

export interface ButtonProps {
  onClick?: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isTransparent?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    className = "",
    disabled = false,
    type = "button",
    isTransparent = false,
}) => {
  return (
    <button
      type={type}
      className={`button ${isTransparent ? "button-transparent" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;