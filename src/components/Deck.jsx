
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
    const [dealerMessage, setDealerMessage] = useState("");
    const [pickedCard, setPickedCard] = useState(null);
    const [removedCards, setRemovedCards] = useState([]);

    /**
     * 
     * @param {*} numOfCards 
     */
    const dealCards = (numOfCards) => {
        console.log("Dealing cards!");
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

        setDealerMessage("Dealing your cards");
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
        console.log("Deck clicked!")
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

    /**
     * 
     * @param {*} index 
     */
    const handleCardClicked = (index) => {
        console.log("Card clicked!");
        if (pickedCard === index) {
            setPickedCard(null);
        } else {    // SHOULD SWAP!!!!!!!!!!!!!!!!
            setPickedCard(index);
        }
    }

    // Toss
    const removeCardPermanent = () => {
        console.log("Removing card... permanently!");
        if (pickedCard !== null) {
            let newDealtCards = [...dealtCards];
            let removedCard = newDealtCards.splice(pickedCard, 1)[0];

            setDealtCards(newDealtCards);
            setPickedCard(null);
            setRemovedCards(previousRemoved => [...previousRemoved, removedCard]);
            setDeck(previousDeck => {
                let newDeck = [];
                for (let i = 0; i < previousDeck.length; i++) {
                    const card = previousDeck[i];
                    if (card.suit !== removedCard.suit || card.value !== removedCard.value) {
                        newDeck.push(card);
                    }
                }
                return newDeck;
            });
        }
    }

    // Regroup
    const shuffleCardsInHand = () => {
        console.log("Shuffling cards in hand!");
        let shuffledCardsInHand = [...dealtCards];
        for (let i = shuffledCardsInHand.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCardsInHand[i], shuffledCardsInHand[j]] = [shuffledCardsInHand[j], shuffledCardsInHand[i]];
        }
        setDealtCards(shuffledCardsInHand);
    }

    // Wildcard
    const createRandomCard = () => {
        const fullDeck = createDeck();
        const randomCard = fullDeck[Math.floor(Math.random() * fullDeck.length)];
        setDealtCards([...dealtCards, randomCard]);
    }  

    /**
     * 
     */
    const resetDeck = () => {
        const newDeck = createDeck();
        let filteredDeck = [];

        for (let i = 0; i < newDeck.length; i++) {
            const card = newDeck[i];

            let isCardRemoved = false;
            for (let j = 0; j < removedCards.length; j++) {
                const removedCard = removedCards[j];
                if (removedCard.suit === card.suit && removedCard.value === card.value) {
                    isCardRemoved = true;
                    break;
                }
            }
            if (!isCardRemoved) filteredDeck.push(card);
        }

        setDeck(filteredDeck);
        setDealtCards([]);
        setIsDeckEmpty(false);
        console.log("Deck has been reset!");
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
            <Hand dealtCards={dealtCards} pickedCard={pickedCard} handleCardClicked={handleCardClicked} />
            {dealerMessage && <div className="dealer-message">{dealerMessage}</div>}
            <div>
                    <Button label="Deal 5" className="btn-deal5" onClick={() => dealCards(5)}/>
                    <Button label="Deal 7" className="btn-deal7" onClick={() => dealCards(7)}/>
                    <Button label="Toss" className="btn-toss" onClick={removeCardPermanent} />
                    <Button label="ReGroup" className="btn-regroup" onClick={shuffleCardsInHand}/>
                    <Button label="WildCard" className="btn-wildcard" onClick={createRandomCard}/>
                    <Button label="Reset" className="btn-reset" onClick={() => resetDeck()}/>
            </div>
        </div>
    );
};


// Exports the Deck component so it can be used other files
export default Deck;