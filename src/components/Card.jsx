
/**
 * @file Card.jsx
 * @author Brendan Dileo 
 * 
 * This file contains the Card component.
 * The Card component will represent a single card in the deck of cards. Each card (Except the wildcard), will 
 * have a unique set of suit and rank, and the Card component will render each Card with a unique set. Additionally,
 * the Card component will include logic for determining if the Card has been picked or not, passed as a prop.
 * 
 * StAuth10244: I Brendan Dileo, 000879513 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 */

import '../components/Card.css';

/**
 * Functional Card Component 
 * 
 * It will determine which style to apply to the card based on the prop passed to the component,
 * and renders the card with its value and suit. The style of the rank and suit displayed will
 * depend a conditional ternary operator, which will determine which color the content of the
 * card should be depending on its rank and suit (Red for hearts and diamonds, black for spades and clubs).
 * 
 * @param {Object} param0 - The object containing the components props (properties).
 * @returns {JSX.Element} - The JSX rendering the Card component onto the page.
 */
const Card = ({ card, isPicked, handleCardClicked }) => {
    // Determines which style class to apply based on the cards suit
    const suitClass = (card.suit === '♥' || card.suit === '♦') ? 'red-suit' : 'black-suit';
    const valueClass = (card.suit === '♥' || card.suit === '♦') ? 'red-value' : 'black-value';

    return (
        <div 
            // Determines which class to apply based on the 'isPicked' var
            className={`card ${isPicked ? "picked" : ""}`} 
            onClick={handleCardClicked}
        >
            <div className="card-content">
                {/* Dynamically styles the card based on its value and suit */}
                <span className={`card-value ${valueClass}`}>{card.value}</span>
                <span className={`card-suit ${suitClass}`}>{card.suit}</span>
            </div>
        </div>
    )
}

export default Card;