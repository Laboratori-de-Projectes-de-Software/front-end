import { BotSummaryResponseDTO } from "@interfaces/bot.interface";
import "./MyBots.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MyBotsProps {
    bots: BotSummaryResponseDTO[];
}

const MyBots: React.FC<MyBotsProps> = ({ bots }) => {

    const navigate = useNavigate();

    return (
        <section className="user-bots">
            <button className="user-bots__add-bot" onClick={() => { navigate("/new-bot") }}>Añadir bot</button>
            {
                bots.map((bot) => {
                    return (
                        <div className="user-bots__card">
                            <p className="user-bots__card-name">
                                {bot.nombre}
                            </p>
                            <p className="user-bots__card-property">
                                {bot.cualidad}
                            </p>

                            <img src="svg/edit.svg" alt="" width={25}/>
                        </div>
                    )
                })
            }
        </section>
    );
}

export default MyBots;