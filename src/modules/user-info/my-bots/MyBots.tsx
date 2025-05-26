import { BotDTO } from "@interfaces/bot.interface";
import "./MyBots.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MyBotsProps {
    bots: BotDTO[];
}

const MyBots: React.FC<MyBotsProps> = ({ bots }) => {

    const navigate = useNavigate();

    return (
        <section className="user-bots">
            <button className="user-bots__add-bot" onClick={() => { navigate("/new-bot") }}>Añadir bot</button>
            {
                bots.length > 0 && bots.map((bot) => {
                    return (
                        <div className="user-bots__card" key={bot.id}>
                            <p className="user-bots__card-name">
                                {bot.name}
                            </p>
                            <p className="user-bots__card-property">
                                {bot.quality}
                            </p>

                            <img src="svg/edit.svg" alt="" width={25} />
                        </div>
                    )
                })
            }
        </section>
    );
}

export default MyBots;