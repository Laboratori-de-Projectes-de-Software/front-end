import Footer from "./Footer";
import SideBar from "./SideBar";
import React, { useState } from "react";

export default function Account() {
    
const [values, setValues] = useState<{ [key: string]: number }>({
    combat_time: 0,
    n_combat: 0,
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value);
    
    setValues((prevValues) => ({
        ...prevValues,
        [name]: isNaN(newValue) || newValue < 0 ? 0 : newValue, // Evita negativos
    }));
};

  return (
    <>
      <div>
        <div className="page_container">
          <SideBar />
          <div className="content_container">
            <div className="account_save">
                <h2> Home </h2>
                <div className="counter">         
                    <label>Combat Time (s):</label>
                    <input 
                        type="number" 
                        name="combat_time"
                        value={values.combat_time} 
                        onChange={handleChange} 
                        className="counter-input" 
                    />
                    <label>Nº of combats:</label>
                    <input 
                        type="number" 
                        name="n_combat"
                        value={values.n_combat} 
                        onChange={handleChange} 
                        className="counter-input" 
                    />
                </div>
              
            </div>
            <div className="IAs_container">

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
