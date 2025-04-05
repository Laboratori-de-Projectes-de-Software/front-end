import './date-input.scss';
import { FC } from 'react';
import { DateTime } from 'luxon';

type Props = {
    value: DateTime | undefined | null,
    text: string,
    setDate: (date: DateTime) => void
};

/**
 * React Component que representa un input de tipo date
 * @param value Valor por defecto
 * @param text Texto del placeholder
 * @param setDate Función para setear la fecha
 * @returns Estructura de un input de tipo date
 * 
 * @example
 * ```tsx	
 * <DateInput
 *  value={hook_variable_DateTime}
 *  text='Titulo'
 *  setDate={hook_function}
 * />
 * ```	
 */
const DateInput: FC<Props> = ({value, text, setDate}) => {
  return (
    <div className="form__date">
        <input
          type="date"
          value={value?.toFormat('yyyy-MM-dd') || ''}
          onChange={(e) => setDate(DateTime.fromISO(e.target.value))}
          className="form__date-input"
          placeholder={text}
        />
      </div>
  );
};

export default DateInput;