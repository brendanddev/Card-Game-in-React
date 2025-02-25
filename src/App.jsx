
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
    <Card />
    <Button label="Deal 5" />
    <Button label="Deal 7" />
    <Button label="Toss" />
    <Button label="WildCard" />
    <Button label="ReGroup" />
    <Button label="Reset" />
    </div>
  )
}

export default App
