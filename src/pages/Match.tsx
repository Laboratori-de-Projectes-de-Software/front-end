import NavBar from "../components/NavBar";
import style from "./Match.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {Link} from "react-router-dom";
import R1 from "../assets/img/R1.png";

export function Match(){

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

    const matchResultsByDay = {
        "LUN\n1 ABR": [
          { home: "Team A", away: "Team B", score: "W - L" },
          { home: "Team C", away: "Team D", score: "L - W" },
        ],
        "MAR\n2 ABR": [
          { home: "Team E", away: "Team F", score: "D - D" },
          { home: "Team G", away: "Team H", score: "W - L" },
        ],
        // ...
    };

    const selectedDate = "LUN\n1 ABR";

    return(
        <div>
            <NavBar/>
            <div className = {style.background}>
                <div className={style.sidebar}>
                <Swiper
                    direction="vertical"
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    className={style.swiper}
                    spaceBetween={20}
                    slidesPerView={10}
                >
                    {aprilDates.map((date, index) => (
                    <SwiperSlide key={index} className={style.slide}>
                        <Link to = "/Match">
                            <pre>{date}</pre>
                        </Link>
                    </SwiperSlide>
                ))}
                </Swiper>
                </div>
                <div className={style.match}>
                    {matchResultsByDay[selectedDate]?.map((match, i) => (
                        <Link to = "/Clash">
                            <div key={i} className={style.result}>
                                <span><strong>{match.home}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                <span className = {style.image} style = {{backgroundImage: `url(${R1})`}}>HH</span>
                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{match.score}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span className = {style.image} style = {{backgroundImage: `url(${R1})`}}>HH</span>
                                <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{match.away}</strong></span>
                            </div>
                        </Link>
                    )) || <p>No hay partidos para esta fecha</p>}
                </div>
            </div>
        </div>
    );
}  