import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ParticipantsPage from '@/routes/ParticipantsPage'
import ClassificationPage from '@/routes/ClassificationPage'
import EnfrontamentsPage from '@/routes/EnfrontamentsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/classification" element={<ClassificationPage />} />
        <Route path="/enfrontaments" element={<EnfrontamentsPage />} />
      </Routes>
    </Router>
  )
}

export default App
