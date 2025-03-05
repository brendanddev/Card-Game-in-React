
// Deck.jsx
// Brendan Dileo

import { useState } from "react";
import Card from "../components/Card";
import "../components/Deck.css";

const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

// Creates the deck
const createDeck = () => { 
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value })
        }
    }
    return deck;
}

const Deck = ({ dealtCards, setDealtCards }) => {
    const [deck, setDeck] = useState(createDeck());

    const handleDeckClicked = () => { 
        if (deck.length === 0) { alert("No more cards left in the deck!"); return; }
        
        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomCardIndex];
        const newDeck = deck[deck.length - 1];
        setDeck(newDeck);
        setDealtCards([...dealtCards, card]);
    }
    
    return (
        <div className="deck-container">
            <div className="deck" onClick={handleDeckClicked}>   
                <span>
                    Deck O' Cards
                    <br />
                    ♠
                    <br />
                    ♧
                </span>   
            </div>
            
            <div className="card-list-container">
                <h3>Your Hand</h3>
                <div className="card-list">
                    {dealtCards.map((card, index) => (
                        <Card key={index} card={card} />
                    ))}
                </div>
            </div>
        </div>
    )

}

// Exports the Deck component so it can be used other files
export default Deck;