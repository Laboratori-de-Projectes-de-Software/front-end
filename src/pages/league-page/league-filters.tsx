import { FC } from 'react';
import { LeaguesFilters } from './league-types';
import './league-filters.scss';
import { DateTime } from 'luxon';

type Props = {
    filters: LeaguesFilters, 
    setFilters: (filters: LeaguesFilters) => void
};

const LeagueFilters: FC<Props> = ({filters, setFilters}) => {

  return (
    <div className="league-filters-container">
        <h2 className="league-filters-title">Filtros</h2>
        <div className="league-filters-input-container">
            <p className='league-filters-label'>Nombre de la liga</p>
            <input
                type="text"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
        </div>
        <div className="league-filters-input-container">
            <p className='league-filters-label'>Fecha de la liga</p>
            <input
                type="date"
                value={filters.date ? filters.date.toFormat('yyyy-MM-dd') : ''}
                onChange={(e) => setFilters({ ...filters, date: DateTime.fromFormat(e.target.value, 'yyyy-MM-dd') })}
            />
        </div>
        <div className="league-filters-input-container">
            <p className='league-filters-label'>Estado</p>
            <div className="league-filters-container-radio-options">
                <div className="league-filters-input-container-radio">
                    <p className='league-filters-label-radio'>En juego</p>
                    <input
                        type="radio"
                        name='playing'
                        checked={filters.playing}
                        onChange={(e) => setFilters({ ...filters, playing: e.target.checked })}
                        />
                </div>
                <div className="league-filters-input-container-radio">
                    <p className='league-filters-label-radio'>Finalizado</p>
                    <input
                        type="radio"
                        name='playing'
                        checked={!filters.playing}
                        onChange={(e) => setFilters({ ...filters, playing: !e.target.checked })}
                        />
                </div>
            </div>
        </div>
    </div>
  );
};

export default LeagueFilters;