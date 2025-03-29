import { FC } from 'react';
import './number-input.scss';

type Props = {
  value: number | undefined | null;
  setValue: (value: string) => void;
  text?: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput: FC<Props> = ({value, setValue, text, min, max, step}) => {

  return (
    <div className="form-field__container">
        <input
          required
          id='text-input'
          className="form-field__input"
          type="number"
          onChange={(e) => setValue(e.target.value)}
          value={value || 0}
          {...(min !== undefined ? { min } : {})}
          {...(max !== undefined ? { max } : {})}
          {...(step !== undefined ? { step } : {})}
          />
          {text ? 
            <label htmlFor='text-input' className="form-field__label">
              {text}
            </label>
          : 
            <></>
          }
      </div>
  )
};

export default NumberInput;