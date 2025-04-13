import React from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { appApi } from "@features/shared/index";
import "./AddBot.scss";

const AddBot: React.FC = () => {

    const auth = useAuth();
    const { data: userBots } = appApi.useGetBotQuery(auth?.getUser()?.userId);
    const [ postBot, _ ] = appApi.usePostLeagueLeagueIdBotMutation();

    const addBotToLeague = (botId: number) => {
        postBot({leagueId: 1, botId}).then((response) => {
            console.log(response);
        })
    }

    return (
        <>
            {
                userBots?.body && userBots?.body.map((bot) => {
                    return (
                        <div className="add-bots__card" key={bot.id}>
                            <p className="add-bots__card-name">
                                {bot.name}
                            </p>
                            <p className="add-bots__card-property">
                                {bot.description}
                            </p>
                            <button className="add-bots__add-button" onClick={() => addBotToLeague(+bot.id)}>Añadir</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default AddBot;
