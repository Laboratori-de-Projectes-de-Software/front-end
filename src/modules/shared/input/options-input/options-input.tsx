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

/**
 * 
 * @param value Valor por defecto
 * @param setValue Función para setear el valor
 * @param options Opciones del select
 * @param text Texto del label
 * @returns Estructura de un input de tipo select
 * 
 * @example
 * ```tsx
 * <OptionsInput
 * value={hook_variable}
 * setValue={hook_function}
 * options={[{value: '1', text: 'Opción 1'}, {value: '2', text: 'Opción 2'}]}
 * text='Titulo'
 * />
 */
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
          required
        >
          <option value="" disabled selected></option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.text}</option>
          ))}
        </select>
      </div>
  )
};

export default OptionsInput;