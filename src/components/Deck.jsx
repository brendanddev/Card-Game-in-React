
// Deck.jsx
// Brendan Dileo

import { useState } from "react";
import { createDeck } from "../utils/manageDeck";

import Hand from "../components/Hand";
import "../components/Deck.css";


const Deck = ({ dealtCards, setDealtCards, setCardsInHand }) => {
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
                if (i !== randomCardIndex) {
                    tempDeck.push(updatedDeck[i]);
                }
            }

            updatedDeck = tempDeck;
            counter++;
        }

        setDeck(updatedDeck);
        let combinedDealtCards = [];
        for (let i = 0; i < dealtCards.length; i++) {
            combinedDealtCards.push(dealtCards[i]);
        }

        for (let i = 0; i < newDealtCards.length; i++) {
            combinedDealtCards.push(newDealtCards[i]);
        }

        setDealtCards(combinedDealtCards);
        let combinedCardsInHand = [];
        for (let i = 0; i < newDealtCards.length; i++) {
            combinedCardsInHand.push(newDealtCards[i]);
        }

        setCardsInHand(combinedCardsInHand);
        setIsDeckEmpty(updatedDeck.length === 0);
    };

    const handleDeckClicked = () => { 
        if (deck.length === 0) { 
            setIsDeckEmpty(true);
            console.log("Deck is empty"); 
            return; 
        }

        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const newDealtCard = deck[randomCardIndex];
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

        newDealtCards.push(newDealtCard);
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
            <Hand dealtCards={dealtCards} />
        </div>
    )

}

// Exports the Deck component so it can be used other files
export default Deck;