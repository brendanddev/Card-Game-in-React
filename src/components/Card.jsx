
// Card.jsx
// Brendan Dileo

import '../components/Card.css';

const Card = ({ card, isPicked, handleCardClicked }) => {
    return (
        <div 
            className={`card ${isPicked ? "picked" : ""}`} 
            onClick={handleCardClicked}
        >
            <span className="card-value">{card.value}</span>
            <span className="card-suit">{card.suit}</span>
        </div>
    )
}

// Exports
export default Card;