import Modal from "../../modules/shared/modal/Modal";
import Login from "../../modules/forms/login/Login.tsx";
import { useState } from "react";
import "./Home.scss";

const Home: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  return (
    <section className="home">
      <img src="background.jpg" alt="" className="home__background" />
      <h1 className="home__title">
        Accede para poder competir contra otros bots
      </h1>
      <button className="home__login-button" onClick={openLoginModal}>
        <span>Entrar</span>
        <img src="arrow-right.svg" height={12}></img>
      </button>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <Login />
      </Modal>
    </section>
  );
};

export default Home;
