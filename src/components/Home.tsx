import { Link } from "react-router";
import Layout from "./Footer";
export default function Home() {
    return (
        <>
            <div className="container">
                <h1 style={{ textDecorationLine: "underline" }}>Human TrAIts</h1>
                <p>Human TrAIts is a college project carried out in groups of
                    6-8 students where the focus is on learning about SCRUM and
                    current web technologies 
                </p>
                <div>
                    <Link to="/login">
                        <button className="button-round button-blue"
                        
                        > Log In</button>
                    </Link>
                    <button className="button-round button-grey">Leaderboard</button>
                </div>
            </div >

            <Layout />
        </>
    );
}