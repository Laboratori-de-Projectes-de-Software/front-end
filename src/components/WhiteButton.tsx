import React from 'react';

interface WhiteButtonProps {
    children: React.ReactNode;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({ children }) => {
    return (
        <button className="bg-[var(--btn-bkg)] text-black font-bold py-2 px-4 rounded-lg hover:cursor-pointer hover:bg-gray-200 transition duration-300 ease-in-out">
        { children }
        </button>
    );
};

export default WhiteButton;