
// Card.jsx
// Brendan Dileo

import '../components/Card.css';

const Card = ({ card }) => {
    return (
        <div className="card">
            <span className="card-value">{card.value}</span>
            <span className="card-suit">{card.suit}</span>
        </div>
    )
}

// Exports
export default Card;