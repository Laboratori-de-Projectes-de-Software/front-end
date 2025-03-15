import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ParticipantsPage from './routes/ParticipantsPage'
import ClassificationPage from './routes/ClassificationPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/participants" element={<ParticipantsPage />} />
        <Route path="/classification" element={<ClassificationPage />} />
      </Routes>
    </Router>
  )
}

export default App
