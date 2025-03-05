
// Deck.jsx
// Brendan Dileo

import { useState, useEffect } from "react";
import { createDeck } from "../utils/manageDeck";

import Button from "../components/Button";
import Hand from "../components/Hand";
import "../components/Deck.css";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const Deck = () => {
    const [deck, setDeck] = useState(createDeck());
    const [dealtCards, setDealtCards] = useState([]);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);

    /**
     * 
     * @param {*} numOfCards 
     */
    const dealCards = (numOfCards) => {
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

        setTimeout(() => {
            setDeck(updatedDeck);
            setDealtCards(newCards);
            setDealerMessage("");
        }, 750);
    };


    /**
     * 
     * @returns 
     */
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
            <div>
                    <Button label="Deal 5" className="btn-deal5" onClick={() => dealCards(5)}/>
                    <Button label="Deal 7" className="btn-deal7" onClick={() => dealCards(7)}/>
                    <Button label="Toss" className="btn-toss" />
                    <Button label="WildCard" className="btn-wildcard" />
                    <Button label="ReGroup" className="btn-regroup" />
                    <Button label="Reset" className="btn-reset" onClick={() => resetDeck()}/>
            </div>
        </div>
    );
};


// Exports the Deck component so it can be used other files
export default Deck;