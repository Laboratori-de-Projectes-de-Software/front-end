import { FC } from 'react';
import './radio-input.scss';

type optionType = {
  value: string | number;
  text: string;
}

type Props = {
  value?: string;
  setValue: (value: string) => void;
  options: optionType[];
  text?: string;
  display?: 'row' | 'column';
}

const RadioInput: FC<Props> = ({value, setValue, options, text, display='row'}) => {
  return (
    <div className={`form__options-input-container-${display}`}>
            {text ? 
                <label
                htmlFor="options-input"
                className="form__options-label"
                >
                    {text}
                </label>
            :
                <></>
            }
            <div className="form__options-container-radio-options">
                <div className={`form__options-input-container-radio-${display}`}>
                    {
                        options.map((option) => (
                            <div key={option.value} className="form__options-radio-option">
                              <p className='form__options-label-radio'>{option.text}</p>
                              <input
                                  type="radio"
                                  name='options-input'
                                  value={option.value}
                                  checked={value === option.value}
                                  onChange={(e) => setValue(e.target.value)}
                              />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

export default RadioInput;