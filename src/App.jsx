
// App.jsx
// Brendan Dileo

import Deck from "../src/components/Deck";
import './App.css'

function App() {
        
  return (
    <div className="main-container">
        <h1 class="text-5xl font-extrabold italic my-6 text-gray-800">Assignment 3 - Deck of Cards</h1>
        <div className="card-container">
            <Deck />
        </div>
    </div>
  )
}

export default App;
