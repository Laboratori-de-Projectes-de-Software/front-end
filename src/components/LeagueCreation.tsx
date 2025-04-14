import Footer from "./Footer";
import SideBar from "./SideBar";
import { useState } from "react";

const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

interface LeagueCreationData {
  name: string,
  urlImage: string,
  rounds: number,
  matchTime: number,
  bots: Array<number>
}

export default function LeagueCreation() {

  const [leagueData, setLeagueData] = useState<LeagueCreationData>({ name: "", urlImage: "", rounds: 0, matchTime: 0, bots: [] });

  const handleLeagueData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    var newValue = value;
    switch (name) {
      case 'rounds':
        if (( +value  < leagueData.bots.length) || (+value >( leagueData.bots.length * (leagueData.bots.length-1))/2) ){
          newValue = leagueData.bots.length.toString();
        }
        break;
      default:
        break;
    }

    setLeagueData({
      ...leagueData,
      [name]: newValue
    });
  }



  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
    
  };

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
                <details className="dropdown-details">
                  <summary className="dropdown-button">
                    {selectedOptions.length > 0 ? selectedOptions.join(", ") : "Seleccionar..."}
                    <span className="icon">▼</span>
                  </summary>
                  <div className="dropdown-menu">
                    {options.map((option) => (
                      <div
                        key={option}
                        className={`option-item ${selectedOptions.includes(option) ? "selected" : ""}`}
                        onClick={() => toggleOption(option)}
                      >
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option)}
                          readOnly
                        />
                        {option}
                      </div>
                    ))}
                  </div>
                </details>
              </div>
              <p>Match details:</p>
              <div className="counter">

                <label>League Name:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue=""
                  value={leagueData.name}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
                <label>League Image</label>
                <input
                  type="url"
                  name="urlImage"
                  defaultValue=""
                  value={leagueData.urlImage}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
                <label>Match duration</label>
                <input
                  type="number"
                  name="matchTime"
                  defaultValue="0"
                  value={leagueData.matchTime}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
                <label>Nº of combats:</label>
                <input
                  type="number"
                  name="rounds"
                  defaultValue="0"
                  value={leagueData.rounds}
                  onChange={handleLeagueData}
                  className="counter-input"
                />
              </div>
              <button className="button-round button-blue">Start</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
