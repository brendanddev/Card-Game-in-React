
// Deck.jsx
// Brendan Dileo

import { useState } from "react";
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
        } else {
            alert("No card is selected! Please make a selection first!");
            return;
        }
    }

    // Regroup
    const shuffleCardsInHand = () => {
        if (dealCards.length === 0) {
            alert("There are no cards in your hand! Deal some cards before shuffling!");
            return;
        }

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
                        onClick={removeCardPermanent} 
                    />
                    <Button 
                        label="ReGroup" 
                        className="bg-purple-500 text-white hover:bg-purple-600"
                        onClick={shuffleCardsInHand}
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


// Exports the Deck component so it can be used other files
export default Deck;