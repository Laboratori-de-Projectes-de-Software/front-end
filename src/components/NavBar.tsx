import React from "react";
import styles from "./NavBar.module.css";

const NavBar: React.FC = () => {

    const links: { id: number; link: string }[] = [
        { id: 1, link: "Home" },
        { id: 2, link: "Bots" },
        { id: 3, link: "Leagues" },
        { id: 4, link: "Management" }
    ];

    return (
        <div className={styles.navbar}>
            <p className = {styles.logo}>IA SUPERLEAGUE</p>
            <ul className = {styles.linksContainer}>
                {links.map((link) => (
                    <li key={link.id}>
                        <a className = {styles.navlink} href={link.link}>{link.link}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavBar;
