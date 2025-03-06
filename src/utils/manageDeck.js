
/**
 * @file manageDeck.js
 * @author Brendan Dileo 
 * 
 * This is a utility file created to structure, create, and manage the deck of cards.
 * The goal was to move any logic from Deck.jsx to this file, to imrpove the readability
 * and modularity of the Deck component. THis utility file contains functions for creating
 * a deck of cards, shuffling the cards, and permanently removing a card.
 */

const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


/**
 * This function creates a deck of 52 cards, no jokers are included.
 * Each of the cards created for the deck will have a corresponding suit and a pair.
 * 
 * @returns {Array} - A deck of 52 card objects, each with a suit and value property.
 */
export const createDeck = () => { 
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value })
        }
    }
    return deck;
};

/**
 * This function is responsible for dealing a specified number of cards from the deck (5 or 7).
 * The cards are chosen randomly from the deck by making use of the 'Math' class, and are stored
 * into a new array containing the cards being dealt.
 * 
 * @param {Array} deck - The deck of card objects.
 * @param {Array} dealtCards - The cards that have been already dealt.
 * @param {int} numOfCards - The number of cards to be dealt.
 * @returns {Object} - An object containing the updated deck and an array of the cards dealt.
 */
export const dealCardsFromDeck = (deck, dealtCards, numOfCards) => {
    // Creates a new array, combines the contents of the existing deck
    // and the array of cards dealt
    let updatedDeck = [...deck, ...dealtCards];
    let newCards = [];  // Cards being dealt
    for (let i = 0; i < numOfCards; i++) {
        if (updatedDeck.length === 0) break;
        // Finds a random index of one of the cards
        const randomCardIndex = Math.floor(Math.random() * updatedDeck.length);
        newCards.push(updatedDeck[randomCardIndex]);
        // Removes the dealt card from the deck
        updatedDeck.splice(randomCardIndex, 1);
    }
    return { updatedDeck, newCards };
};

/**
 * This function will shuffle the cards that are in the users hand using a Fisher Yates algorithm.
 * 
 * @param {Array} cards - The cards to shuffle in the users hand.
 * @returns {Array} - An shuffled array of the cards.
 */
export const shuffleCardsInHand = (cards) => {
    let shuffledCards = [...cards];
    // Fisher yates
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    return shuffledCards;
};

/**
 * This function permanently removes a card from the list of cards dealt, and the deck of cards.
 * The 'picked' card is identified by its index in the array of cards, and then spliced to be 
 * removed from the array of cards dealt. It is then filtered out of the deck itself so even
 * after resetting this card will not reappear.
 * 
 * Although it is not necesarily clear what is asked of this in the assignment requirements, I 
 * interpreted it as essentially swapping the picked card with the next card, or un selecting the
 * picked card. If the page is reset, this will be overriden.
 * 
 * @param {Array} deck - The current deck of cards.
 * @param {Array} dealtCards - The array of cards that have already been dealt.
 * @param {int} pickedCard - The index of the selected card that will be 'tossed' (removed).
 * @returns {Object} - An object containing the updated deck, the updated cards dealt, and the card that has been removed.
 */
export const removeCardPermanent = (deck, dealtCards, pickedCard) => {
    let newDealtCards = [...dealtCards];
    let removedCard = newDealtCards.splice(pickedCard, 1)[0];
    // Shorthand for a for loop iterating through the cards in the deck,
    // creates a new array without the card removed
    let newDeck = deck.filter(card => !(card.suit === removedCard.suit && card.value === removedCard.value));
    return { newDeck, newDealtCards, removedCard };
};