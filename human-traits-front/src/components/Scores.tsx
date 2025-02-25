import Footer from "./Footer";
import SideBar from"./SideBar";

export default function Scores(){
    return (
        <>
            <SideBar />
            <div className="scores-container">
                <h1>Scores</h1>
                {/* Aquí se mostrarán los scores */}
            </div>
            <Footer />
        </>
    )
}