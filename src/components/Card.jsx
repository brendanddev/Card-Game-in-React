
/**
 * @file Card.jsx
 * @author Brendan Dileo 
 * 
 * 
 */

import '../components/Card.css';

/**
 * Functional Card Component 
 * 
 * @param {*} param0 
 * @returns 
 */
const Card = ({ card, isPicked, handleCardClicked }) => {
    return (
        <div 
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

// Exports
export default Card;