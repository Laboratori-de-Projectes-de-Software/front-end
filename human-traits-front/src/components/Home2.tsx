import Footer from "./Footer";
import SideBar from "./SideBar";

export default function Account() {

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (parseInt(e.target.value) < 0 || isNaN(parseInt(e.target.value))) {
    e.target.value = "0"; // Si el valor es negativo, lo forzamos a 0
  }
}

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
