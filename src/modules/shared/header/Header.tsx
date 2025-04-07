import { useAuth } from "../../../auth/AuthProvider";
import { useModal } from "../../modalManager/ModalProvider";
import "./Header.scss";

const Header: React.FC = () => {

  const { openModal } = useModal();
  const auth = useAuth();

  return (
    <>
      <header className="top-level-header">
        <nav>
          <ul className="top-level-header__item-list">
            {auth?.isUserLoggedIn ? (
              <>
                <li>
                  <button className="top-level-header__login" onClick={() => openModal("login")}>Iniciar sesión</button>
                  <div className="top-level-header__login-decoration"></div>
                </li>
                <li>
                  <button className="top-level-header__register" onClick={() => openModal("register")}>Registrarse</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="top-level-header__login" onClick={() => auth?.logout()}>Cerrar sesión</button>
                  <div className="top-level-header__login-decoration"></div>
                </li>
              </>
            )
            }
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
