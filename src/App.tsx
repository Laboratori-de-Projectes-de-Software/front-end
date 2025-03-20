import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomePage from '@routes/WelcomePage'
import LoginPage from '@routes/LoginPage'
import ParticipantsPage from '@routes/ParticipantsPage'
import ClassificationPage from '@routes/ClassificationPage'
import ConfrontationsPage from '@routes/ConfrontationsPage'
import Navbar from '@components/Navbar'
import AddLeaguePage from '@routes/AddLeaguePage'

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/classification" element={<ClassificationPage />} />
          <Route path="/confrontations" element={<ConfrontationsPage />} />
          <Route path="/add-league" element={<AddLeaguePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
