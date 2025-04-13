import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './features/shared/store.ts'
import './index.css'
import App from './App.tsx'

// if (import.meta.env.MODE === 'development') {
//   const { worker } = await import('./mocks/browser.ts')
//   worker.start()
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
