import Footer from "./Footer";
import SideBar from "./SideBar";
import { useState, useEffect, FormEvent } from "react";
import MultiselectDropdown from "./MultiSelectDropdown";
import { BotDTO, BotSummaryResponseDTO, LeagueDTO } from "./ConAPI";
interface BotOption {
  name: string;
  botId: number;
}

interface LeagueCreationData {
  name: string;
  urlImage: string;
  rounds: number;
  matchTime: number;
  bots: Array<number>;
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

export default function LeagueCreation() {
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

  // Get data from back


  const [leagueData, setLeagueData] = useState<LeagueCreationData>({
    name: "",
    urlImage: "",
    rounds: 0,
    matchTime: 0,
    bots: [],
  });

  const [selectedOptions, setSelectedOptions] = useState<BotOption[]>([]);

  // Update leagueData.bots when selectedOptions changes
  useEffect(() => {
    setLeagueData(prevData => ({
      ...prevData,
      bots: selectedOptions.map(bot => bot.botId),
      rounds: selectedOptions.length > 1 ? selectedOptions.length : prevData.rounds
    }));
  }, [selectedOptions]);

  const handleLeagueData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    switch (name) {
      case 'rounds':
        const minRounds = leagueData.bots.length || 0;
        const maxRounds = minRounds > 1 ? (minRounds * (minRounds - 1)) / 2 : 0;

        if ((+value < minRounds) || (+value > maxRounds && maxRounds > 0)) {
          newValue = minRounds.toString();
        }
        break;
      default:
        break;
    }

    setLeagueData({
      ...leagueData,
      [name]: newValue,
    });
  };

  // Handle the selected bots
  const handleBotSelection = (selected: BotOption[]) => {
    setSelectedOptions(selected);
  };

  const canCreateLeague = leagueData.name !== "" &&
    leagueData.matchTime > 0 &&
    leagueData.rounds > 0 &&
    leagueData.bots.length > 1;


  const handleLeagueCreation = (e: FormEvent<HTMLButtonElement>): void => {
    const leagueInfo: LeagueDTO = {
      name: leagueData.name,
      urlImagen: leagueData.urlImage,
      matchTime: leagueData.matchTime,
      rounds: leagueData.rounds,
      bots: leagueData.bots,
      userId: parseInt(getCookie("userId"))
    }
    window.APIConection.postLeague(leagueInfo).then().catch((error) => console.log(error));
  }
  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="content_home">
              <h2> Home </h2>
              <p>Select the AIs for the match:</p>
              <div className="dropdown-container">
                <MultiselectDropdown
                  options={availableBots}
                  selectedOptions={selectedOptions}
                  onChange={handleBotSelection}
                  placeholder="Select bots for the league"
                />
              </div>
              <p>Match details:</p>
              <div className="counter">
                <label>League Name:</label>
                <input
                  type="text"
                  name="name"
                  value={leagueData.name}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
                <label>League Image</label>
                <input
                  type="url"
                  name="urlImage"
                  value={leagueData.urlImage}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
                <label>Match duration</label>
                <input
                  type="number"
                  name="matchTime"
                  value={leagueData.matchTime}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
                <label>Nº of combats:</label>
                <input
                  type="number"
                  name="rounds"
                  value={leagueData.rounds}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
              </div>
              <button
                className={`button-round ${canCreateLeague ? "button-blue" : "button-disabled"}`}
                disabled={!canCreateLeague}
                onClick={handleLeagueCreation}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}