
// Hand.jsx
// Brendan Dileo

import Card from "../components/Card";
import "../components/Deck.css";

const Hand = ({ dealtCards, pickedCard, handleCardClicked }) => {
    return (
        <div className="card-list-container mb-10">
            <h3 className="mt-4 mb-10 text-2xl font-semibold border-black pb-2">Your Hand</h3>
            <div className="card-list">
                {dealtCards.map((card, index) => (
                    <Card 
                        key={index} 
                        card={card}
                        isPicked={pickedCard === index}
                        handleCardClicked={() => handleCardClicked(index)}
                    />
                ))}
            </div>
        </div>
    )
};

export default Hand;

