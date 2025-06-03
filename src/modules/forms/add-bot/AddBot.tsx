import React from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { appApi } from "@features/shared/index";
import "./AddBot.scss";
import { BotDTO } from "@interfaces/bot.interface";
import Modal from "@modules/shared/modal/Modal";

interface AddBotProps {
    leagueId: number;
}

const AddBot: React.FC<AddBotProps> = ({ leagueId }) => {
    const [addImage, setAddImage] = React.useState<{ [key: number]: string }>({});
    const [showModal, setShowModal] = React.useState(false);

    const auth = useAuth();
    const { data: userBots } = appApi.useGetBotQuery(auth?.getUser()?.userId);
    const [postBot, _] = appApi.usePostLeagueLeagueIdBotMutation();

    const addBotToLeague = (botId: number) => {
        setAddImage((prev) => ({ ...prev, [botId]: "loading" }));
        postBot({ leagueId, botId }).then(() => {
            setAddImage((prev) => ({ ...prev, [botId]: "add-bot-league" }));
            setShowModal(true);
        });
    };

    return (
        <>
            {userBots?.body && userBots.body.map((bot: BotDTO) => (
                <div className="add-bots__card" key={bot.id} onClick={() => addBotToLeague(+bot.id)}>
                    <p className="add-bots__card-name">{bot.name}</p>
                    <p className="add-bots__card-property">{bot.quality}</p>
                    <img
                        className="add-bots__card-add"
                        src={`svg/${addImage[bot.id]}.svg`}
                        onError={event => (event.currentTarget.src = "svg/add-bot-league.svg")}
                        alt="add bot to league"
                        width={20}
                    />
                </div>
            ))}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <p>¡Bot añadido correctamente a la liga!</p>
                </Modal>
            )}
        </>
    );
};

export default AddBot;
