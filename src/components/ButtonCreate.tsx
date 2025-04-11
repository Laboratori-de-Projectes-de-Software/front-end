import React from "react";
import "./ButtonCreate.css";

export interface ButtonProps {
    onClick?: () => void;
    label: string;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

const ButtonCreate: React.FC<ButtonProps> = ({
                                           onClick,
                                           label,
                                           className = "",
                                           disabled = false,
                                           type = "button",
                                       }) => {
    return (
        <button
            type={type}
            className={`button-create ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default ButtonCreate;