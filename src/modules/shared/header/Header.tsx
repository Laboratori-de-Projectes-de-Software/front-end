import React, { useState } from "react";
import Modal from "../modal/Modal";
import Login from "../../../modules/forms/login/Login";
import Register from "../../../modules/forms/register/Register";
import "./Header.scss";

const Header: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <>
      <header className="top-level-header">
        <nav>
          <ul className="top-level-header__item-list">
            <li>
              <button className="top-level-header__login" onClick={openLoginModal}>Iniciar sesión</button>
              <div className="top-level-header__login-decoration"></div>
            </li>
            <li>
              <button className="top-level-header__register" onClick={openRegisterModal}>Registrarse</button>
            </li>
          </ul>
        </nav>
      </header>

      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <Login />
      </Modal>

      <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal}>
        <Register />
      </Modal>
    </>
  );
};

export default Header;
