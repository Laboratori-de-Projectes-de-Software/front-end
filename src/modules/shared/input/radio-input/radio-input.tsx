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

const RadioInput: FC<Props> = ({value, setValue, options, text}) => {
  return (
    <div className="league-filters-input-container">
            {text ? 
                <label
                htmlFor="options-input"
                className="league-filters-label"
                >
                    {text}
                </label>
            :
                <></>
            }
            <div className="league-filters-container-radio-options">
                <div className="league-filters-input-container-radio">
                    {
                        options.map((option) => (
                            <div key={option.value} className="league-filters-radio-option">
                              <p className='league-filters-label-radio'>{option.text}</p>
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