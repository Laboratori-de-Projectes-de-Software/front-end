import Footer from "./Footer";
import SideBar from"./SideBar";

export default function Scores() {
  const matches = [
    { winner: "Trait1 (Username)", date: "01/01/2025", points: 3, link: "/match/1" },
    { winner: "Trait2 (User123)", date: "02/01/2025", points: 5, link: "/match/2" },
    { winner: "Trait3 (GamerX)", date: "03/01/2025", points: 2, link: "/match/3" },
    { winner: "Trait4 (Player99)", date: "04/01/2025", points: 4, link: "/match/4" },
    { winner: "Trait5 (ProGamer)", date: "05/01/2025", points: 6, link: "/match/5" },
  ];

  return (
    <>
    <div>
      <div className="page_container">
        <SideBar />
        <div className="content_container">
          <div className="scores_container">
            <h1>Scores</h1>
            <h2 className="title">Historical data from all the matches:</h2>
            {matches.map((match, index) => (
              <div key={index} className="match_card">
                <div className="match_info">
                  <p className="winner">Winner: {match.winner}</p>
                  <p className="date">{match.date}</p>
                  <p className="points">{match.points} Points</p>
                </div>
                <a href={match.link} className="match_link">
                  View
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    </>
  );
}
