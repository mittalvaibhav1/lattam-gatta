import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import Card from "../Card/Card";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import "./PlayedCardsGroup.css";

const PlayedCardsGroup = ({ playedCardsGroup, onClick }) => {
  const { gameRoomDetails } = useContext(RoomContext);
  return (
    <div key={playedCardsGroup.playedBy} className="playedcardsgroup">
      {playedCardsGroup.playedBy !== "default" && (
        <div className="playedcardsgroup__playedBy">
          <PlayerAvatar
            player={gameRoomDetails.players.find(
              (player) => player.uid === playedCardsGroup.playedBy
            )}
          />
          <span>
            {
              gameRoomDetails.players.find(
                (player) => player.uid === playedCardsGroup.playedBy
              ).name
            }{" "}
          </span>
        </div>
      )}
      {playedCardsGroup.cards.map((card, index) => (
        <Card
          onClick={onClick ? () => onClick(card) : null}
          key={index}
          card={card}
        />
      ))}
    </div>
  );
};

export default PlayedCardsGroup;
