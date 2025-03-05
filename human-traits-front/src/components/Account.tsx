import Footer from "./Footer";
import SideBar from "./SideBar";
import { useState } from "react";
import Usuario from "../assets/user-picture.png";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={label} className="form-label">{label}</label>
    <input className="form-input" id={label} type={type} value={value} onChange={onChange} />
  </div>
);

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => (
  <button onClick={onClick} className="button-round button-blue">
    {text}
  </button>
);

export default function Account() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="account_save">
              <h2> Account Settings</h2>
              <img src={Usuario} alt="Representación visual del usuario" className="user-image" />
              <div className="form-container">
                <form>

                  <InputField label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <Button text="Save" />
                </form>
              </div>
            </div>
            <div className="IAs_container">

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}