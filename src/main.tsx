import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ConAPI} from './components/ConAPI'
import {ConBack} from './components/ConBack'
import App from './App'

declare global {
    interface Window {
        APIConection: ConAPI;  // or a more specific type
    }
}

// Initialize it
export function initGlobals(){
  window.APIConection = new ConBack();
}

initGlobals();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
