
/**
 * @file main.jsx 
 * @author Brendan Dileo
 * 
 * The entry point to the React Card Game application.
 * This file has not been edited, but will render the root component into the DOM.
 * The 'index.css' file is imported to allow the entire project to use the TatilwindCSS styles.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
