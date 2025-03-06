
/**
 * @file Card.jsx
 * @author Brendan Dileo 
 * 
 * This file contains the Card component.
 * The Card component will represent a single card in the deck of cards. Each card (Except the wildcard), will 
 * have a unique set of suit and rank, and the Card component will render each Card with a unique set. Additionally,
 * the Card component will include logic for determining if the Card has been picked or not, passed as a prop.
 */

import '../components/Card.css';

/**
 * Functional Card Component 
 * 
 * It will determine which style to apply to the card based on the prop passed to the component,
 * and renders the card with its value and suit.
 * 
 * @param {Object} param0 - The object containing the components props (properties).
 * @returns {JSX.Element} - The JSX rendering the Card component onto the page.
 */
const Card = ({ card, isPicked, handleCardClicked }) => {
    return (
        <div 
            // Determines which class to apply based on the 'isPicked' var
            className={`card ${isPicked ? "picked" : ""}`} 
            onClick={handleCardClicked}
        >
            <div className="card-content">
                <span className="card-value">{card.value}</span>
                <span className="card-suit">{card.suit}</span>
            </div>
        </div>
    )
}

export default Card;