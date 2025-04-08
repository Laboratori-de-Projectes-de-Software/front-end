import "./Home.scss";
import StarField from "../../modules/home/stars/stars.tsx";
import { useState, useEffect } from "react";
import { useModal } from "../../modules/modalManager/ModalProvider.tsx";
import { useAuth } from "../../auth/AuthProvider.tsx";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [blurAmount, setBlurAmount] = useState(0)
  const auth = useAuth();
  const { openModal }  = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const maxBlur = 8
      const triggerHeight = window.innerHeight * 1.2
      const newBlurAmount = Math.min(maxBlur, (window.scrollY / triggerHeight) * maxBlur)

      setBlurAmount(newBlurAmount)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const redirectToLeague = () => {
    if (auth?.isUserLoggedIn()) {
      navigate("/league")
    } else {
      openModal("login")
    }
  }

  return (
    <section className="home">
      <StarField blurAmount={blurAmount} />
      <h1 className="home__title">
        Accede para poder unirte a una liga
      </h1>
      <button className="home__login-button" onClick={redirectToLeague}>
        <span className="top-key"></span>
        <span className="text">ENTRAR</span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
    </section>
  );
};

export default Home;
