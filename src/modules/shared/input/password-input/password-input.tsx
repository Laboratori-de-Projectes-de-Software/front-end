import { FC, useState } from 'react';
import './password-input.scss';
import OpenEye from '../../icons/open_eye';
import OpenEyeCrossed from '../../icons/open_eye_crossed';

type Props = {
  value: string | undefined | null;
  setValue: (value: string) => void;
  text?: string;
}

const PasswordInput: FC<Props> = ({value, setValue, text}) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="password-main-container">
      <div className="password-field__container">
        <input
          required
          id='password-input'
          className="password-field__input"
          type={showPassword ? "text" :"password"}
          onChange={(e) => setValue(e.target.value)}
          value={value || ''}
          />
        {text ? 
          <label htmlFor='password-input' className="password-field__label">
            {text}
          </label>
        : 
          <></>
        }
      </div>
      <button
        type="button"
        className="password-field__toggle-password"
        onClick={togglePasswordVisibility}
        >
        {showPassword ? <OpenEye /> : <OpenEyeCrossed />}
      </button>
    </div>
  )
};

export default PasswordInput;