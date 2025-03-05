
// Deck.jsx
// Brendan Dileo

import { useState } from "react";
import { createDeck } from "../utils/manageDeck";

import Hand from "../components/Hand";
import "../components/Deck.css";


const Deck = ({ dealtCards, setDealtCards }) => {

    const [deck, setDeck] = useState(createDeck());
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);

    const dealCards = (numOfCards) => {
        if (deck.length === 0) {
            setIsDeckEmpty(true);
            console.log("Deck is empty!");
            return;
        }

        let updatedDeck = [];
        for (let i = 0; i < deck.length; i++) {
            updatedDeck.push(deck[i]);
        }

        let newDealtCards = [];
        let counter = 0;

        while (counter < numOfCards && updatedDeck.length > 0) {
            const randomCardIndex = Math.floor(Math.random() * updatedDeck.length);
            newDealtCards.push(updatedDeck[randomCardIndex]);

            let tempDeck = [];
            for (let i = 0; i < updatedDeck.length; i++) {
                if (i !== randomIndex) {
                    tempDeck.push(updatedDeck[i]);
                }
            }
            updatedDeck = tempDeck;
            counter++;

            if (i === numOfCards - 1 || updatedDeck.length === 0) {
                setDeck(updatedDeck);
                setDealtCards(newCards);
                setIsDeckEmpty(updatedDeck.length === 0);
            }
        }
    };

   
    const handleDeckClicked = () => { 
        if (deck.length === 0) { 
            setIsDeckEmpty(true);
            console.log("Deck is empty"); 
            return; 

        }

        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const newDealtCard = deck[randomIndex];
        let updatedDeck = [];

        for (let i = 0; i < deck.length; i++) {
            if (i !== randomCardIndex) {
                updatedDeck.push(deck[i]);
            }
        }

        setDeck(updatedDeck);
        let newDealtCards = [];
        for (let i = 0; i < deck.length; i++) {
            newDealtCards.push(dealtCards[i]);
        }

        newDealtCard.push(newDealtCard);
        setDealtCards(newDealtCards);
        setIsDeckEmpty(updatedDeck.length === 0);
    };
    
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
            <Hand  />
        </div>
    )

}

// Exports the Deck component so it can be used other files
export default Deck;