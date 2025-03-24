import React from "react";

const NavBar: React.FC = () => {
    // Definiendo un array de enlaces con su tipo
    const links: { id: number; link: string }[] = [
        { id: 1, link: "Home" }
    ];

    return <div>NavBar</div>;
};

export default NavBar;
