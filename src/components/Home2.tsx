import Footer from "./Footer";
import SideBar from "./SideBar";
import { useState } from "react";

const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

export default function Account() {

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (parseInt(e.target.value) < 0 || isNaN(parseInt(e.target.value))) {
    e.target.value = "0"; // Si el valor es negativo, lo forzamos a 0
  }
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
                    <label>Combat Time (s):</label>
                    <input 
                        type="number" 
                        name="combat_time"
                        defaultValue="0"
                        onChange={handleChange} 
                        className="counter-input" 
                    />
                    <label>Nº of combats:</label>
                    <input 
                        type="number" 
                        name="n_combat"
                        defaultValue="0"
                        onChange={handleChange} 
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
