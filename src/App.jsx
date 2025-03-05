
// App.jsx
// Brendan Dileo

import { useState } from "react";
import Deck from "../src/components/Deck";
import Button from "./components/Button";

import './App.css'

function App() {
  const [dealtCards, setDealtCards] = useState([]);
        
  return (
    <div className="main-container">
      <h1>Assignment 3 - Deck of Cards</h1>
      <div className="card-container">
        <Deck dealtCards={dealtCards} setDealtCards={setDealtCards} />
      </div>
        <Button label="Deal 5" className="btn-deal5" onClick={() => dealCards && dealCards(5)}/>
        <Button label="Deal 7" className="btn-deal7" onClick={() => dealCards && dealCards(7)}/>
        <Button label="Toss" className="btn-toss" />
        <Button label="WildCard" className="btn-wildcard" />
        <Button label="ReGroup" className="btn-regroup" />
        <Button label="Reset" className="btn-reset" />
    </div>
  )
}

export default App;
