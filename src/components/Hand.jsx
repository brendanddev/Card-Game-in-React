
// Hand.jsx
// Brendan Dileo

import Card from "../components/Card";
import "../components/Deck.css";

const Hand = ({ }) => {
    return (
        <div className="card-list-container">
            <h3>Your Hand</h3>
            <div className="card-list">
                {/* {dealtCards.map((card, index) => (
                    <Card key={index} card={card} />
                ))} */}
            </div>
        </div>
    )
};

export default Hand;

