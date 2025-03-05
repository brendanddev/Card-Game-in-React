
// manageDeck.js
// Brendan Dileo
// A utility file to manage the deck of cards, and seperate the logic from the Deck


const suits = ["♥", "♦", "♣", "♠"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];


// Creates the deck
export const createDeck = () => { 
    let deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value })
        }
    }
    return deck;
};
