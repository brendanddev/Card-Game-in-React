
// App.jsx
// Brendan Dileo

import Deck from "../src/components/Deck";
import Card from "./components/Card";
import Button from "./components/Button";

import './App.css'

function App() {

  return (
    <div className="main-container">
      <h1>Assignment 3</h1>
      <div className="card-container">
      <Card />
      </div>
      <Button label="Deal 5" className="btn-deal5" />
      <Button label="Deal 7" className="btn-deal7" />
      <Button label="Toss" className="btn-toss" />
      <Button label="WildCard" className="btn-wildcard" />
      <Button label="ReGroup" className="btn-regroup" />
      <Button label="Reset" className="btn-reset" />
    </div>
  )
}

export default App
