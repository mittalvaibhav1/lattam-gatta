import "./Reaction.css";

const Reaction = ({ reaction, className }) => {
  return (
    <div className={`reaction ${className}`}>
      <div className="reaction__header">{reaction.name} reacted with</div>
      <img src={`images/emojis/${reaction.key}.png`} alt={reaction.key} />
    </div>
  );
};

export default Reaction;
