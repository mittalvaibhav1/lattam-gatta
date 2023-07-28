import "./Card.css";

const Card = ({ card, onClick = null }) => {
  return (
    <div
      key={card.card}
      className="card"
      onClick={onClick}
      style={
        card.isSelected
          ? { boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px" }
          : {}
      }
    >
      <img src={`images/cards/${card.card}.svg`} alt={card.card} />
    </div>
  );
};

export default Card;
