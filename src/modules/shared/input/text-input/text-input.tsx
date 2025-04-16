import { FC } from 'react';
import './text-input.scss';

type Props = {
  value: string | undefined | null;
  setValue: (value: string) => void;
  text?: string;
}

const TextInput: FC<Props> = ({value, setValue, text}) => {

  return (
    <div className="form-field__container">
        <input
          required
          id='text-input'
          className="form-field__input"
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value || ''}
          />
          <label htmlFor={'text-input'} className="form-field__label">
          {text}
        </label>
      </div>
  )
};

export default TextInput;