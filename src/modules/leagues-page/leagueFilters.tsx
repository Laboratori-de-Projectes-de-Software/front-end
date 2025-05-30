import { FC, useState } from 'react';
import './leagueFilters.scss';
import OptionsInput from '../shared/input/options-input/options-input';
import TextInput from '../shared/input/text-input/text-input';
import NumberInput from '../shared/input/number-input/number-input';
import RadioInput from '../shared/input/radio-input/radio-input';
import PasswordInput from '../shared/input/password-input/password-input';

const LeagueFilters: FC = () => {
    const [aux, setAux] = useState('');
    const [auxN, setAuxN] = useState<number>();
    const [auxRadio, setAuxRadio] = useState('1');
    const [auxPassword, setAuxPassword] = useState('');
  return (
    <div className="league-filters-container">
        <h2 className="league-filters-title">Filtros</h2>
        <OptionsInput
            options={[
                { value: '60', text: '60 segundos' },
                { value: '120', text: '120 segundos' },
                { value: '180', text: '180 segundos' },
            ]}
            text='Duración'
            value={aux}
            setValue={(value: string) => setAux(value)}
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
