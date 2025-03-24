import './options-input.scss';
import { FC } from 'react';

type optionType = {
    value: string | number;
    text: string;
}

type Props = {
    value?: string;
    setValue: (value: string) => void;
    options: optionType[];
    text?: string;
}

const OptionsInput: FC<Props> = ({value, setValue, options, text}) => {
  return (
    <div className="form__options">
        {text ? 
          <label
          htmlFor="options-input"
          className="form__text-label"
          >
            {text}
          </label>
        : 
          <></>
        }
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id="options-input"
          name="options-input"
          className="form__options-input"
        >
          <option value="" selected></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))}
        </select>
      </div>
  )
};

export default OptionsInput;