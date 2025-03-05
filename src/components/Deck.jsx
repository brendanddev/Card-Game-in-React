
// Deck.jsx
// Brendan Dileo

import { useState, useEffect } from "react";
import { createDeck } from "../utils/manageDeck";

import Hand from "../components/Hand";
import "../components/Deck.css";

const Deck = ({ dealtCards, setDealtCards, setDealCardsRef }) => {
    // State to track the deck
    const [deck, setDeck] = useState(createDeck());
    // State to track if the deck is empty or not
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);

    // Deals a certain number of cards from the deck to the user
    const dealCards = (numOfCards) => {
        // Combine before dealing *****************
       let updatedDeck = [...deck, ...dealtCards];
        setDeck(updatedDeck);
        setDealtCards([]);

        let newCards = [];
        for (let i = 0; i < numOfCards; i++) {
            if (updatedDeck.length === 0) break;
            const randomCardIndex = Math.floor(Math.random() * updatedDeck.length);
            newCards.push(updatedDeck[randomCardIndex]);
            updatedDeck.splice(randomCardIndex, 1);
        }
        setDeck(updatedDeck);
        setDealtCards(newCards);
    };

    useEffect(() => {
        setDealCardsRef(() => dealCards);
    }, [setDealCardsRef]);

    const handleDeckClicked = () => { 
        if (deck.length === 0) { 
            setIsDeckEmpty(true);
            console.log("Deck is empty"); 
            return; 
        }

        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomCardIndex];

        let newDeck = [...deck];
        newDeck.splice(randomCardIndex, 1);
        setDeck(newDeck);
        setDealtCards([...dealtCards, card]);

        if (newDeck.length === 0) {
            setIsDeckEmpty(true);
        }
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
};


// Exports the Deck component so it can be used other files
export default Deck;