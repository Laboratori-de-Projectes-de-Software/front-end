
import LeagueElement from '@modules/leagues-page/leagueElement';
import './leaguesPage.scss';
import { appApi } from '../../features/shared/index';
import { useModal } from '@modules/modalManager/ModalProvider';
import LoadingScreen from '@modules/shared/loading-screen/loading-screen';
import { LeagueResponseDTO } from '@interfaces/league.interface';


const LeaguesPage: React.FC = () => {

  const { data: leaguesData, isLoading } = appApi.useGetLeagueQuery(0);
  const { openModal } = useModal();

  if (isLoading) {
    return <LoadingScreen message='cargando ligas...' />;
  }

  return (
    <article className='leagues-page-main-container'>
      <header className="leagues-page-header">
        <h2 className='leagues-page-main-title'>Ligas de bots</h2>
        <p className='leagues-page-main-subtitle'>Explora todas las competiciones disponibles para tus bots</p>
        <button onClick={() => openModal("new-league")}>Crear liga</button>
      </header>
      <div className='leagues-page-leagues-container'>
        {leaguesData && leaguesData?.body.map((element: LeagueResponseDTO) => (
          <LeagueElement key={element.leagueId} {...element} />
        ))}
      </div>
    </article>
  );
}

export default LeaguesPage;