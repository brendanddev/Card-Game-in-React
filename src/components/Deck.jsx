
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
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);

    const handleDeckClicked = () => { 
        if (deck.length === 0) { 
            setIsDeckEmpty(true);
            console.log("Deck is empty"); 
            return; 
        }
        
        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomCardIndex];

        const newDeck = [];
        for (let i = 0; i < deck.length; i++) {
            if (i !== randomCardIndex) {
                newDeck.push(deck[i]);
            }
        }
        setDeck(newDeck);
        setDealtCards([...dealtCards, card]);

        if (newDeck.length === 0) {
            setIsDeckEmpty(true);
        }
    }
    
    return (
        <div className="deck-container">
            {isDeckEmpty ? (
                <div className="empty-deck">
                    <span>No Cards remaining in the Deck!</span>
                </div>
            ) : (
                    <div className="deck" onClick={handleDeckClicked}>   
                        <span>
                            Deck O' Cards
                            <br />
                            ♠
                            <br />
                            ♧
                        </span>   
                    </div>
            )}
            <br />
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