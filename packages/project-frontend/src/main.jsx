import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// eslint-disable-next-line
const DATA = [];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{marginLeft: "12.5em", marginTop: "3.5em"}}>
      <App tasks={DATA} />
    </div>
  </StrictMode>,
)
