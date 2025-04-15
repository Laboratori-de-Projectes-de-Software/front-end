import React from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { appApi } from "@features/shared/index";
import "./AddBot.scss";
import { BotSummaryResponseDTO } from "@interfaces/bot.interface";

const AddBot: React.FC = () => {


    const [addImage, setAddImage] = React.useState<{ [key: number]: string }>({});
    const auth = useAuth();
    const { data: userBots } = appApi.useGetBotQuery(auth?.getUser()?.userId);
    const [postBot, _] = appApi.usePostLeagueLeagueIdBotMutation();

    const addBotToLeague = (botId: number) => {
        setAddImage((prev) => ({ ...prev, [botId]: "loading" }));
        postBot({ leagueId: 1, botId }).then((response) => {
            setAddImage((prev) => ({ ...prev, [botId]: "add-bot-league" }));

            console.log(response);
        })
    }

    return (
        <>
            {
                userBots?.body && userBots?.body.map((bot: BotSummaryResponseDTO) => {
                    return (
                        <div className="add-bots__card" key={bot.id} onClick={() => addBotToLeague(+bot.id)}>
                            <p className="add-bots__card-name">
                                {bot.name}
                            </p>
                            <p className="add-bots__card-property">
                                {bot.description}
                            </p>
                            <img className="add-bots__card-add" src={`svg/${addImage[bot.id]}.svg`} onError={event => event.target.src = "svg/add-bot-league.svg"} alt="add bot to league" width={20} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default AddBot;
