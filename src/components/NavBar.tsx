import React from "react";
import styles from "./NavBar.module.css";
import logo from "./../assets/img/logo.png";

const NavBar: React.FC = () => {
    const links = [
        { id: 1, link: "Home" },
        { id: 2, link: "Bots" },
        { id: 3, link: "Leagues" },
        { id: 4, link: "Management" }
    ];
    
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isLoggedIn = user?.isLoggedIn;

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src={logo} alt="IA SUPERLEAGUE Logo" className={styles.logo} />
                <p className={styles.logoText}>IA SUPERLEAGUE</p>
            </div>

            <ul className={styles.linksContainer}>
                {links.map((link) => (
                    <li key={link.id}>
                        <a className={styles.navlink} href={link.link}>{link.link}</a>
                    </li>
                ))}
                {isLoggedIn && (
                    <a className={styles.logoutButton} onClick={handleLogout}>Logout</a>
                )}
            </ul>
        </div>
    );
};

export default NavBar;
