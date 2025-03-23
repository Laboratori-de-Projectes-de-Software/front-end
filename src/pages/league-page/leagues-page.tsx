import { FC, useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import LeagueElement from './league-element';
import axios from 'axios';
import { LeaguesFilters, LeagueType } from './league-types';
import './leagues-page.scss';
import LeagueFilters from './league-filters';
import Modal from '../../modules/shared/modal/Modal';

type Props = LeaguesFilters;

const LeaguesPage: FC<Props> = (Props) => {

  // TODO: Limpiar esto
  const [leagues, setLeagues] = useState<LeagueType[]>([
    {
      date: '2021-10-01 00:00:00',
      id: 1,
      name: 'Liga 1',
      numRounds: 5,
      playTime: 60,
      playing: true
    },
    {
      date: '2021-10-01 00:00:00',
      id: 2,
      name: 'Liga 1',
      numRounds: 5,
      playTime: 60,
      playing: true
    },
    {
      date: '2021-10-01 00:00:00',
      id: 3,
      name: 'Liga 1',
      numRounds: 5,
      playTime: 60,
      playing: true
    },
    {
      date: '2021-10-01 00:00:00',
      id: 4,
      name: 'Liga 1',
      numRounds: 5,
      playTime: 60,
      playing: true
    },
    {
      date: '2021-10-01 00:00:00',
      id: 5,
      name: 'Liga 1',
      numRounds: 5,
      playTime: 60,
      playing: true
    }
  ]);
  const [filters, setFilters] = useState<LeaguesFilters>(Props)
  const [modalOpen, setModalOpen] = useState(false);

  const closeLoginModal = () => setModalOpen(false);

  const fetchLeagues = () => {
    // TODO: Cambiar la URL por la que corresponda
    axios.post<LeagueType[]>(`${import.meta.env.VITE_REACT_APP_API_URL}/leagues`, { ...filters })
      .then((response) => {
        setLeagues(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchLeagues();
  });

  return (
    <div className='leagues-page-main-container'>
      <div className="leagues-page-header">
        <h2 className='leagues-page-main-title'>Listado de ligas</h2>
        <button className='leagues-page-filters-button' onClick={() => setModalOpen(true)}>Filtros</button>
      </div>
      <div className='leagues-page-leagues-container'>
        {leagues.map((league) => (
          <div className='leagues-page-league-container' key={league.id}>
            <LeagueElement
            key={league.id}
            id={league.id}
            name={league.name}
            date={DateTime.fromFormat(league.date, 'YYYY-MM-DD HH:mm:ss')} // TODO: Poner que el formato de la fecha venga desde el env
            numRounds={5}
            playTime={60}
            playing
            />
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={closeLoginModal}>
        <LeagueFilters filters={filters} setFilters={setFilters} />
      </Modal>
    </div>
  );
}

export default LeaguesPage;