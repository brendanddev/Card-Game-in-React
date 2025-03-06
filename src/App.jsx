
/**
 * @file App.jsx
 * @author Brendan Dileo
 * 
 * 
 * The root of the React Card Game application.
 * This component is the main container for the application, and will render the title of the page,
 * and the Deck component, which will handle majority of the game logic, and render the deck onto
 * the screen.
 */

import Deck from "../src/components/Deck";
import './App.css'

/**
 * App Component
 * 
 * Renders the title of the page, and the Deck component.
 * 
 * @returns {JSX.Element} The JSX containing the rendered main container.
 */
function App() {
  return (
      <div className="main-container">
         <h1 className="text-5xl font-extrabold italic my-6 text-gray-800 transform transition duration-300 hover:scale-105">
            Assignment 3 - Deck of Cards
        </h1>
        <div className="card-container">
            <Deck />
        </div>
      </div>
  )
}

export default App;
