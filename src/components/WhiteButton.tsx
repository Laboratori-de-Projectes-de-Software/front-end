import React from 'react';

interface WhiteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string; // Para permitir clases adicionales
  }

const WhiteButton: React.FC<WhiteButtonProps> = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`bg-[var(--btn-bkg)] text-black font-bold py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-300 transition duration-100 ease-in-out ${className}`}
            {...props}
        >
            { children }
        </button>
    );
};

export default WhiteButton;