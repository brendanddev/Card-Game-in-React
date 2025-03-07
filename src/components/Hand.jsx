
/**
 * @file Hand.jsx
 * @author Brendan Dileo 
 * 
 * This file contains the logic and functionality for the Hand component.
 * The Hand component will represent the users hand of cards, which have been dealt.
 * It will receive the cards that have been dealt through a prop (property), track
 * which card has been picked, and handle the event of a click of one of the cards
 * in hand.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import Card from "../components/Card";
import "../components/Deck.css";

/**
 * Functional Hand Component
 * 
 * This component structures the 'hand' section of the game container.
 * It will use the 'map' function to render each of the cards in the users hand
 * using the index as the key, and the card object to render the cards values.
 * 
 * @param {Object} param0 - The object containing the components props (properties).
 * @returns {JSX.Element} - The JSX rendering the users hand onto the page.
 */
const Hand = ({ dealtCards, pickedCard, handleCardClicked }) => {
    return (
        <div className="card-list-container mb-10">
            <h3 className="mt-4 mb-10 text-2xl font-semibold border-black pb-2">Your Hand</h3>
            <div className="card-list">
                {/* Maps over each card by index, renders each card */}
                {dealtCards.map((card, index) => (
                    <Card 
                        key={index} // Key to identify the card object by index
                        card={card} // The card object
                        isPicked={pickedCard === index} // Checks if the card is 'picked'
                        handleCardClicked={() => handleCardClicked(index)} // Handles the event where the card is 'picked'
                    />
                ))}
            </div>
        </div>
    )
};

export default Hand;

