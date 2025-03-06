
/**
 * @file Deck.jsx
 * @author Brendan Dileo 
 * 
 * 
 */

import { useState } from "react";
import { createDeck, dealCardsFromDeck, shuffleCardsInHand, removeCardPermanent } from "../utils/manageDeck.js";
import Button from "../components/Button";
import Hand from "../components/Hand";
import "../components/Deck.css";

/**
 * Functional Deck Component
 * 
 * This component is responsible for managing the state of the deck, and the state of the cards that have been
 * dealt. It will also make use of several utility functions to emphasize a seperation of concerns, and modular 
 * code by using the functions in the manageDeck.js file.
 * 
 * @returns {JSX.Element} The JSX containing the rendered deck, and the controls associated with the deck.
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
        const { updatedDeck, newCards } = dealCardsFromDeck(deck, dealtCards, numOfCards);
        
        setDealerMessage("Dealing your cards...");
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
        console.log("Deck clicked!");
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

        if (pickedCard === null) {
            setPickedCard(index);
        } else if (pickedCard === index) {
            setPickedCard(null);
        } else {
            let newDealtCards = [...dealtCards];
            const temp = newDealtCards[index];
            newDealtCards[index] = newDealtCards[pickedCard];
            newDealtCards[pickedCard] = temp;
            setDealtCards(newDealtCards);
            setPickedCard(null);
        }
    };

    /**
     * 
     * @returns 
     */
    const removeCardPermanentHandler = () => {
        console.log("Removing card... permanently!");
        if (pickedCard !== null) {
            const { newDeck, newDealtCards, removedCard } = removeCardPermanent(deck, dealtCards, pickedCard);

            setDealtCards(newDealtCards);
            setPickedCard(null);
            setRemovedCards(prevRemoved => [...prevRemoved, removedCard]);
            setDeck(newDeck);
        } else {
            alert("No card is selected! Please make a selection first!");
            return;
        }
    };

    /**
     * 
     * @returns 
     */
    const shuffleCardsInHandHandler = () => {
        if (dealtCards.length === 0) {
            alert("There are no cards in your hand! Deal some cards before shuffling!");
            return;
        }

        console.log("Shuffling cards in hand!");
        const shuffledCardsInHand = shuffleCardsInHand(dealtCards);
        setDealtCards(shuffledCardsInHand);
    };

    /**
     * 
     */
    const createRandomCard = () => {
        const fullDeck = createDeck();
        const randomCard = fullDeck[Math.floor(Math.random() * fullDeck.length)];
        setDealtCards([...dealtCards, randomCard]);
    };

    /**
     * 
     */
    const resetDeck = () => {
        const newDeck = createDeck();
        let filteredDeck = [];

        for (let i = 0; i < newDeck.length; i++) {
            const card = newDeck[i];
            let isCardRemoved = removedCards.some(removedCard => removedCard.suit === card.suit && removedCard.value === card.value);
            if (!isCardRemoved) filteredDeck.push(card);
        }

        setDeck(filteredDeck);
        setDealtCards([]);
        setIsDeckEmpty(false);
    };

    return (
        <div className="deck-container">
            {isDeckEmpty ? (
                <div className="empty-deck">
                    <span>No Cards remaining in the Deck!</span>
                </div>
            ) : (
                <>
                    <h1 className="mt-4 mb-10 text-2xl font-bold border-b border-black pb-2">The Deck O' Cards</h1>
                    <div className="deck" onClick={handleDeckClicked}>
                        <div className="deck-list">
                            <div className="deck-card deck-card-one"></div>
                            <div className="deck-card deck-card-two"></div>
                            <div className="deck-card deck-card-three"></div>
                            <div className="deck-card deck-card-four"></div>
                            <div className="deck-card deck-card-five"></div>
                        </div>
                    </div>
                </>
            )}
            <br />
            <Hand dealtCards={dealtCards} pickedCard={pickedCard} handleCardClicked={handleCardClicked} />
            {dealerMessage && (
                <div className="dealer-message text-black text-xl font-semibold p-4 max-w-xs mx-auto">
                    {dealerMessage}
                </div>
            )}

            <div className="button-container">
                <Button 
                    label="Deal 5" 
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => dealCards(5)}
                />
                <Button 
                    label="Deal 7" 
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => dealCards(7)}
                />
                <Button 
                    label="Toss" 
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={removeCardPermanentHandler} 
                />
                <Button 
                    label="ReGroup" 
                    className="bg-purple-500 text-white hover:bg-purple-600"
                    onClick={shuffleCardsInHandHandler}
                />
                <Button 
                    label="WildCard" 
                    className="bg-yellow-500 text-black hover:bg-yellow-600"
                    onClick={createRandomCard}
                />
                <Button 
                    label="Reset" 
                    className="bg-cyan-500 text-white hover:bg-cyan-600"
                    onClick={() => resetDeck()}
                />
            </div>
        </div>
    );
};

export default Deck;
