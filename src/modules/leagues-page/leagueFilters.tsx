import { FC, useState } from 'react';
import { LeaguesFilters } from '../../interfaces/shared/league.interface';
import './league-filters.scss';
import { DateTime } from 'luxon';
import DateInput from '../shared/input/date-input/date-input';
import OptionsInput from '../shared/input/options-input/options-input';
import TextInput from '../shared/input/text-input/text-input';
import NumberInput from '../shared/input/number-input/number-input';
import RadioInput from '../shared/input/radio-input/radio-input';
import PasswordInput from '../shared/input/password-input/password-input';

type Props = {
    filters: LeaguesFilters, 
    setFilters: (filters: LeaguesFilters) => void
};

const LeagueFilters: FC<Props> = ({filters, setFilters}) => {
    const [aux, setAux] = useState('');
    const [auxN, setAuxN] = useState<number>();
    const [auxRadio, setAuxRadio] = useState('1');
    const [auxPassword, setAuxPassword] = useState('');
  return (
    <div className="league-filters-container">
        <h2 className="league-filters-title">Filtros</h2>
        <DateInput 
            value={filters.date} 
            text='Fecha de la liga' 
            setDate={
                (date: DateTime) => setFilters({ ...filters, date })
            }
        />
        <OptionsInput
            options={[
                { value: '3', text: '3 minutos' },
                { value: '5', text: '5 minutos' },
                { value: '10', text: '10 minutos' },
            ]}
            text='Duración'
            value={aux}
            setValue={(value: string) => setAux(value)}
        />
        <TextInput
            value={filters.name}
            setValue={(value: string) => setFilters({ ...filters, name: value })}
            text='Nombre de la liga'
        />
        <NumberInput
            setValue={(value => setAuxN(Number(value)))}
            value={auxN}
            text='Cantidad de jugadores'
        />
        <RadioInput
            value={auxRadio}
            setValue={(value: string) => setAuxRadio(value)}
            options={[
                { value: '1', text: 'Liga' },
                { value: '2', text: 'Eliminatoria' },
                { value: '3', text: 'Grupo' },
            ]}
            text='Tipo de liga'
            display='row'
        />
        <PasswordInput
            value={auxPassword}
            setValue={(value: string) => setAuxPassword(value)}
            text='Contraseña de la liga'
        />
    </div>
  );
};

export default LeagueFilters;
