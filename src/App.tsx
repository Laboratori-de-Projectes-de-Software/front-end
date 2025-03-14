import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ParticipantsPage from './routes/ParticipantsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participants" element={<ParticipantsPage />} />
      </Routes>
    </Router>
  )
}

export default App
