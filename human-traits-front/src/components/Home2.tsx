import Footer from "./Footer";
import SideBar from "./SideBar";

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

  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="account_save">
              <h2> Home </h2>
              
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