import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from '@routes/WelcomePage'
import LoginPage from '@routes/LoginPage'
import RegisterPage from '@routes/RegisterPage'
import ParticipantsPage from '@routes/ParticipantsPage'
import Navbar from '@components/Navbar'
import AddLeaguePage from '@routes/AddLeaguePage'
import AddParticipantPage from '@routes/AddParticipantPage'
import Match from '@routes/MatchPage'
import LogOutPage from '@routes/LogOutPage'
import LeaguesPage from '@routes/LeaguesPage'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/user/:userId/bots" element={<ParticipantsPage />} />
          <Route path="/bots" element={<ParticipantsPage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/leagues/:leagueId/matches/:matchId" element={<Match />} />
          <Route path="/add-league" element={<AddLeaguePage />} />
          <Route path="/add-bot" element={<AddParticipantPage />} />
          <Route path="/logout" element={<LogOutPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
