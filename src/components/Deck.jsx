
/**
 * @file Deck.jsx
 * @author Brendan Dileo 
 * 
 * This file contains the logic, functionality, and rendering of the Deck component.
 * The Deck component is the main component for managing the state of the deck of cards, and handling interactions between
 * the user and the deck of cards. It manages the state of the deck by using state variables to manage the state of the 
 * deck itself, like tracking whether the deck is empty. It will also track the number of cards that have been dealt to 
 * the user, whether to display a message from the dealer, and whether a card has been picked or removed. This component
 * makes use utility functions from the 'manageDeck.js' file, to seperate concerns and make the code more modular. The
 * component will also render the buttons itself, removing the direct dependency between this component and the App 
 * component.
 * 
 * The user will be able to deal five cards, deal seven cards, toss (permanently remove) a card, regroup their cards (shuffle),
 * create a wildcard (random card), or reset the deck.
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
 * dealt. It will also make use of several utility functions to emphasize a separation of concerns, and modular 
 * code by using the functions in the manageDeck.js file.
 * 
 * @returns {JSX.Element} The JSX containing the rendered deck, and the controls associated with the deck.
 */
const Deck = () => {
    // State vars
    const [deck, setDeck] = useState(createDeck());
    const [dealtCards, setDealtCards] = useState([]);
    const [isDeckEmpty, setIsDeckEmpty] = useState(false);
    const [dealerMessage, setDealerMessage] = useState("");
    const [pickedCard, setPickedCard] = useState(null);
    const [removedCards, setRemovedCards] = useState([]);

    /**
     * This function will deal a specified number of cards to the user from the deck.
     * It makes use of the util function 'dealCardsFromDeck', to handle the logic of
     * removing the cards dealt from the deck, and adding them to the cards dealt. After
     * cards have been dealt, the state of the deck itself and the users hand will be
     * updated to reflect the changes. It will also make use of a timeout to simulate
     * a brief pause period before the cards are actually dealt to the user.
     * 
     * @param {int} numOfCards - The number of cards being dealt from the deck (1, 5, or 7).
     * @return {void} - No return, updates the state of the deck and the cards dealt.
     */
    const dealCards = (numOfCards) => {
        // Calls the util function, and extracts the properties from the object returned
        const { updatedDeck, newCards } = dealCardsFromDeck(deck, dealtCards, numOfCards);
        setDealerMessage("Dealing your cards...");
        setTimeout(() => {  // Timeout for delay effect
            setDeck(updatedDeck);
            setDealtCards(newCards);
            setDealerMessage("");
        }, 750);
    };

    /**
     * This function handles the event where the user has clicked on the deck.
     * It will be triggered/executed when the user clicks on the deck of cards, and will handle the logic
     * for dealing a single card from the deck, and placing it into the users hand (dealt cards). It will
     * also update the state of the deck, and the cards dealt. It uses basic error handling to check whether
     * the deck is empty or not, updating the state of the deck accordingly. The card dealt to the user when
     * the deck is clicked will be a random card that will be selected, removed from the deck, and added to
     * the array of cards dealt (the users hand). Once the card is dealt, it will check again to ensure the
     * deck is not empty.
     * 
     * @returns {void} - There is no return type, instead the state of the deck is updated depending on the result of the function.
     */
    const handleDeckClicked = () => { 
        if (deck.length === 0) { 
            setIsDeckEmpty(true);
            return; 
        }

        // Generates a random valid index within bounds of the deck and
        // retreives and stores the corresponding card based on the index
        const randomCardIndex = Math.floor(Math.random() * deck.length);
        const card = deck[randomCardIndex];

        // Creates a copy of the deck before dealing the card
        let newDeck = [...deck];
        // Removes the card from the deck at the random index
        newDeck.splice(randomCardIndex, 1);
        // Updates the state of the deck and the cards that have been dealt
        setDeck(newDeck);
        setDealtCards([...dealtCards, card]);

        // Check to make sure after dealing the 
        // deck still has cards
        if (newDeck.length === 0) {
            setIsDeckEmpty(true);
        }
    };

    /**
     * This function handles the event where the user has picked a card in their hand.
     * The user can pick (select) a card by clicking on it, the card picked will now have a different css class
     * applied to indicate it has been selected. The user may also unpick (deselect) their card by re clicking
     * on the card previously picked. Two cards in the users hand may be swapped if they choose to pick a card, 
     * and then click on another card, resulting in the two cards swapping positions. Since only one card can be 
     * picked at once, unless the event is the user picking a card, the state of the picked card is set to null 
     * after a card has been deselected or swapped. Depending on which event occurs, the state of the picked 
     * card will be updated accordingly.
     * 
     * @param {int} index - The index of the picked (clicked) card in the users hand.
     * @return {void} - The function does not return anything, and instead updates the state of the picked card, and the cards dealt.
     */
    const handleCardClicked = (index) => {
        // Check if no card has been picked
        if (pickedCard === null) {
            setPickedCard(index);
        // Check if a card is already picked
        } else if (pickedCard === index) {
            setPickedCard(null);
        // Check if user clicks on a card but already has one picked (swap)
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
     * This function is responsible for removing a card from the users hand, and the deck of cards permanently.
     * It is triggered when the user has a card picked, and presses the 'toss' button on the page. The card
     * picked will be permanently removed from the users hand, and the deck of cards, until the page is refreshed. 
     * The state of the deck and cards dealt will be updated to reflect the permanent removal of the card. If no
     * card is picked and the button is pressed, an alert will popup as basic error handling.
     * 
     * @return {void} - The function has no return, and instead updates the state of the deck and cards dealt.
     */
    const removeCardPermanentHandler = () => {
        if (pickedCard !== null) {
            // Calls util function to remove the cards, and returns an
            // object containing the deck and cards dealt without the card tossed
            const { newDeck, newDealtCards, removedCard } = removeCardPermanent(deck, dealtCards, pickedCard);

            setDealtCards(newDealtCards);
            setPickedCard(null);
            // Tracks the card removed
            setRemovedCards(prevRemoved => [...prevRemoved, removedCard]);
            setDeck(newDeck);
        } else {
            alert("No card is selected! Please make a selection first!");
            return;
        }
    };

    /**
     * This function is responsible for handling the event where the user wants to shuffle (regroup) the cards in their hand.
     * It makes use of the util function to actually perform the shuffle, and update the state of the cards dealt to reflect
     * the shuffle. It will also make sure the user has cards in their hand before performing a shuffle, displaying an alert
     * if no cards are in their hand.
     * 
     * @return {void} - The function does not directly return any values, and instead updates the state of the cards dealt.
     */
    const shuffleCardsInHandHandler = () => {
        if (dealtCards.length === 0) {
            alert("There are no cards in your hand! Deal some cards before shuffling!");
            return;
        }
        // Calls the util func and passes the cards dealt as a prop, it returns the shuffled array of cards dealt
        // then updates the state to reflect the shuffle
        const shuffledCardsInHand = shuffleCardsInHand(dealtCards);
        setDealtCards(shuffledCardsInHand);
    };

    /**
     * This function creates a random card and adds it to the users hand (cards dealt).
     * It will call use the util func to create a brand new deck, and generates a random index to retreive a random card.
     * This card is then added to the array of cards dealt by updating its state. This function allows for a card already
     * dealt or in the deck to be added.
     * 
     * @return {void} - No return, updates the state of the cards dealt.
     */
    const createRandomCard = () => {
        const fullDeck = createDeck();
        const randomCard = fullDeck[Math.floor(Math.random() * fullDeck.length)];
        setDealtCards([...dealtCards, randomCard]);
    };

    /**
     * This function resets the deck of cards and cards dealt.
     * It will call the util function to create a brand new deck of cards, and creates an empty array to hold the reset deck.
     * It loops through each card in the deck that was just created, and compares each card in the deck against the array of 
     * cards that have been removed. It copies each of the cards from the deck created to the filtered deck as long as the card
     * has not been removed, and updates the state of the deck and the cards that have been dealt to reflect the reset.
     * 
     * @return {void} - No return, updates the state of the deck and cards dealt.
     */
    const resetDeck = () => {
        // Create a brand new deck, initialize a array to hold
        // the filtered deck
        const newDeck = createDeck();
        let filteredDeck = [];

        // Double check this
        // Can I use FILTER???
        for (let i = 0; i < newDeck.length; i++) {
            const card = newDeck[i];
            // Checks if the current card is one of the removed cards by comoparing the suit and value of the 
            // current card with each card in the array of removed cards
            let isCardRemoved = removedCards.some(removedCard => removedCard.suit === card.suit && removedCard.value === card.value);
            // If its not a removed card, add it to the filtered deck
            if (!isCardRemoved) filteredDeck.push(card);
        }

        setDeck(filteredDeck);
        setDealtCards([]);
        setIsDeckEmpty(false);
    };

    return (
        <div className="deck-container">
            {/* Checks the state of the deck, and renders the corresponding content based on whether it is empty or not */}
            {isDeckEmpty ? (
                <div className="empty-deck">
                    <span>No Cards remaining in the Deck!</span>
                </div>
            ) : (
                <>
                    <h1 className="mt-4 mb-10 text-2xl font-bold border-b border-black pb-2">The Deck O' Cards</h1>
                    {/* Attaches an event handler to the deck, executed when the user clicks the deck */}
                    <div className="deck" onClick={handleDeckClicked}>
                        <div className="deck-list">
                            {/* For card spread effect, see deck.css */}
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
            {/* Renders the Hand component, passing the cards dealt, the card currently picked, and an event handler for 
                determining what happens when the card is clicked as a prop */}
            <Hand dealtCards={dealtCards} pickedCard={pickedCard} handleCardClicked={handleCardClicked} />
            {/* Uses the dealer message state to determine whether or not to display the dealer message */}
            {dealerMessage && (
                <div className="dealer-message text-black text-xl font-semibold p-4 max-w-xs mx-auto">
                    {dealerMessage}
                </div>
            )}

            {/* Renders the Button components, with custom props and each button having different functionality */}
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
