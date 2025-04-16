import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from './SideBar'
import Footer from './Footer';
import { BotDTO, BotSummaryResponseDTO } from './ConAPI';
import MultiselectDropdown from './MultiSelectDropdown';

type AnadirBotLigaParamas = {
    leagueId: string; // It is a string due to parameters being passed through url
};

interface BotOption {
    name: string;
    botId: number;
}

interface AIInfo {
    name: string,
    description: string,
    urlImage: string,
    endpoint: string
}

interface NotificationProps {
    message: string;
    type: "success" | "error";
}
function getCookie(c: string): string {
    console.log(document.cookie);
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, value] = cookie.split('=');
        if (cookieName === c) {
            return `${decodeURIComponent(value)}`;
        }
    }
    return "";
}

const AnadirBotLiga: React.FC = () => {
    const { leagueId } = useParams<AnadirBotLigaParamas>();
    const [botInfo, setBotInfo] = useState<AIInfo>({ name: "", description: "", urlImage: "", endpoint: "" });
    const [notification, setNotification] = useState<NotificationProps | null>(null);
    const [selectedOptions, setSelectedOptions] = useState<BotOption[]>([]);

    const [availableBots, setAvailableBots] = useState<BotOption[]>([]);
    useEffect(() => {
        window.APIConection.getAllBotsUser(parseInt(getCookie("userId")))
            .then((bots: BotSummaryResponseDTO[]) => {
                // Wrap the object literal in parentheses to return it directly
                const botOptions = bots.map(bot => ({
                    name: bot.name,
                    botId: bot.id,
                }));
                setAvailableBots(botOptions);
            })
            .catch(error => {
                console.error("Error fetching bots:", error);
            });
    }, []);




    const handleBotPost = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        // Validate input data

        selectedOptions.forEach((bot) => {
            window.APIConection
                .registerBotToLeague(parseInt(leagueId ?? "0"), bot.botId)
                .then((response: any) => {
                    setNotification({
                        message: `Bot ${bot.name} registered successfully!`,
                        type: "success",
                    });
                })
                .catch((error: any) => {
                    setNotification({
                        message: error.message || `Failed to register Bot ${bot.name}`,
                        type: "error",
                    });
                });
        });

        
    };
    const handleBotSelection = (selected: BotOption[]) => {
        setSelectedOptions(selected);
    };
    const notificationStyles = {
        container: {
            padding: '12px 16px',
            borderRadius: '4px',
            marginBottom: '16px',
            position: 'relative' as const,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        success: {
            backgroundColor: '#e6f4ea',
            border: '1px solid #34a853',
            color: '#1e7e34'
        },
        error: {
            backgroundColor: '#fdecea',
            border: '1px solid #ea4335',
            color: '#d32f2f'
        },
        closeButton: {
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '8px'
        }
    };

    // Notification component
    const Notification = ({ message, type }: NotificationProps) => {
        const style = {
            ...notificationStyles.container,
            ...(type === "success" ? notificationStyles.success : notificationStyles.error)
        };

        return (
            <div style={style} role="alert">
                <span>{message}</span>
                <button
                    style={notificationStyles.closeButton}
                    onClick={() => setNotification(null)}
                >
                    &times;
                </button>
            </div>
        );
    };
    return (
        <>
            <div>
                <div className="page_container">
                    <SideBar />
                    <div className="content_container">
                        <div className="dropdown-container">
                            <MultiselectDropdown
                                options={availableBots}
                                selectedOptions={selectedOptions}
                                onChange={handleBotSelection}
                                placeholder="Select bots for the league"
                            />
                        </div>
                        <button onClick={handleBotPost}>Add bot</button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AnadirBotLiga;
