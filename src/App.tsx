import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from '@routes/WelcomePage'
import LoginPage from '@routes/LoginPage'
import RegisterPage from '@routes/RegisterPage'
import ParticipantsPage from '@routes/ParticipantsPage'
import ClassificationPage from '@routes/ClassificationPage'
import ConfrontationsPage from '@routes/ConfrontationsPage'
import Navbar from '@components/Navbar'
import AddLeaguePage from '@routes/AddLeaguePage'
import AddParticipantPage from '@routes/AddParticipantPage'
import Match from '@routes/MatchPage'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/classification" element={<ClassificationPage />} />
          <Route path="/confrontations" element={<ConfrontationsPage />} />
          <Route path="/add-league" element={<AddLeaguePage />} />
          <Route path="/add-bot" element={<AddParticipantPage />} />
          <Route path="/match/:matchId" element={<Match />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
