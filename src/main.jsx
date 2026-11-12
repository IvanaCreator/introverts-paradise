import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import App from './App.jsx'
import './App.css';
import './styles/home.css';
import './styles/books.css';
import './styles/journal.css';
import './styles/garden.css';
import './styles/puzzle.css';
import './styles/theme.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
