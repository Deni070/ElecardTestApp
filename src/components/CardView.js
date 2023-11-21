import React from 'react';

const Card = ({ card, onClose, isCardClosed }) => {
    const handleClose = () => {
        onClose(card.id);
    };

    return (
        <div className={`card ${isCardClosed(card.id) ? 'closed' : ''}`}>
      <span className="close" onClick={handleClose}>
        &times;
      </span>
            <div className="card-content">
                <img src={`http://contest.elecard.ru/frontend_data/${card.image}`} alt={card.category} />
                <div className="category-block">
                    <p>Category: {card.category}</p>
                </div>

            </div>
        </div>
    );
};

const CardView = ({ cards, onClose, isCardClosed }) => {
    return (
        <div className="card-view">
            {cards.map((card) => (
                <Card key={card.id} card={card} onClose={onClose} isCardClosed={isCardClosed} />
            ))}
        </div>
    );
};

export default CardView;
