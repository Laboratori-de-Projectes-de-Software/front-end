import NavBar from "../components/NavBar";
import style from "./Leagues.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export function Leagues() {

    const Teams = [
        { name: 'Team A', J: 14, V: 11, E: 0, D: 3, PTS: 10 },
        { name: 'Team B', J: 16, V: 12, E: 2, D: 2, PTS: 26 },
        { name: 'Team C', J: 12, V: 9, E: 3, D: 0, PTS: 21 },
        { name: 'Team D', J: 15, V: 13, E: 1, D: 1, PTS: 27 },
        { name: 'Team E', J: 10, V: 6, E: 2, D: 2, PTS: 16 },
        { name: 'Team F', J: 13, V: 8, E: 4, D: 1, PTS: 20 },
        { name: 'Team G', J: 14, V: 7, E: 4, D: 3, PTS: 18 },
        { name: 'Team H', J: 16, V: 10, E: 4, D: 2, PTS: 24 },
        { name: 'Team I', J: 11, V: 6, E: 3, D: 2, PTS: 15 },
        { name: 'Team J', J: 13, V: 9, E: 2, D: 2, PTS: 20 },
        { name: 'Team K', J: 14, V: 8, E: 3, D: 3, PTS: 19 },
        { name: 'Team L', J: 10, V: 5, E: 2, D: 3, PTS: 12 },
        { name: 'Team M', J: 12, V: 7, E: 3, D: 2, PTS: 17 },
        { name: 'Team N', J: 15, V: 11, E: 2, D: 2, PTS: 24 },
        { name: 'Team O', J: 14, V: 9, E: 4, D: 1, PTS: 22 },
        { name: 'Team P', J: 13, V: 8, E: 3, D: 2, PTS: 19 },
        { name: 'Team Q', J: 14, V: 6, E: 5, D: 3, PTS: 17 },
        { name: 'Team R', J: 10, V: 4, E: 3, D: 3, PTS: 15 },
        { name: 'Team S', J: 11, V: 5, E: 4, D: 2, PTS: 14 },
        { name: 'Team T', J: 13, V: 7, E: 4, D: 2, PTS: 18 },
        { name: 'Team U', J: 12, V: 8, E: 2, D: 2, PTS: 18 },
        { name: 'Team V', J: 14, V: 9, E: 2, D: 3, PTS: 20 },
        { name: 'Team W', J: 15, V: 10, E: 3, D: 2, PTS: 23 },
        { name: 'Team X', J: 13, V: 7, E: 3, D: 3, PTS: 18 },
        { name: 'Team Y', J: 14, V: 8, E: 4, D: 2, PTS: 20 },
        { name: 'Team Z', J: 10, V: 5, E: 3, D: 2, PTS: 13 },
    ];

    const sTeams = [...Teams].sort((a, b) => b.PTS - a.PTS);

    const generateDates = (year: number, month: number) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        let dates: string[] = [];
    
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            const weekday = date.toLocaleString('default', { weekday: 'short' }).toUpperCase(); // LUN, MAR, etc.
            const formattedDate = `${weekday}\n${day} ABR`;  // Añadir salto de línea
            dates.push(formattedDate);
        }
    
        return dates;
    }
    
    const aprilDates = generateDates(2025, 4);
    console.log(aprilDates);

    return (
        <div>
            <NavBar/>
        <div className = {style.background}>
            <div className={style.sidebar}>
                <h2>My Leagues</h2>
                <ul>
                    <li>League 1</li>
                    <li>League 2</li>
                    <li>League 3</li>
                </ul>
            </div>
            <div className = {style.leagueContent}>
                <div className = {style.league}>
                    <h2>League 1</h2>
                    <h3>Historial</h3>
                    <div className = {style.history}>
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation
                            pagination={{ clickable: true }}
                            className={style.swiper}
                            spaceBetween={20}
                            slidesPerView={10}
                        >
                            {aprilDates.map((date, index) => (
                            <SwiperSlide key={index} className={style.slide}>
                                <pre>{date}</pre>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                    <h3>Clasificacion</h3>
                    <div className = {style.clasification}>
                    <table className={style.table}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>J</th>
                            <th>V</th>
                            <th>E</th>
                            <th>D</th>
                            <th>PTS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sTeams.map((team, index) => (
                            <tr key={team.name}>
                            <td>{index + 1}</td>
                            <td className = {style.name}>{team.name}</td>
                            <td>{team.J}</td>
                            <td>{team.V}</td>
                            <td>{team.E}</td>
                            <td>{team.D}</td>
                            <td className = {style.pts}>{team.PTS}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}