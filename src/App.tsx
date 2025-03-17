import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ParticipantsPage from '@/routes/ParticipantsPage'
import ClassificationPage from '@/routes/ClassificationPage'
import ConfrontationsPage from '@/routes/ConfrontationsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/classification" element={<ClassificationPage />} />
        <Route path="/confrontations" element={<ConfrontationsPage />} />
      </Routes>
    </Router>
  )
}

export default App
