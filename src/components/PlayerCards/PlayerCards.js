import { Fragment, useEffect, useState } from "react";
import Card from "../Card/Card";
import PlayerActions from "../PlayerActions/PlayerActions";
import "./PlayerCards.css";

const PlayerCards = ({ playerCards = [], isMyTurn, isMyTurnToPick }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(playerCards);
  }, [playerCards]);

  const handleCardClick = (selectedCard) => {
    setCards(
      cards.map((card) => {
        card.isSelected =
          card.card === selectedCard.card ? !card.isSelected : card.isSelected;
        if (card.isSelected === undefined) {
          card.isSelected = false;
        }
        return card;
      })
    );
  };
  return (
    <Fragment>
      <div className="playercards">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={
              isMyTurn && !isMyTurnToPick ? () => handleCardClick(card) : null
            }
          />
        ))}
      </div>
      <PlayerActions cards={cards} />
    </Fragment>
  );
};

export default PlayerCards;
