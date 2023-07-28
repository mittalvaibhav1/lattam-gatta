import { useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";
import { RoomContext } from "../../contexts/RoomContext";
import { updateGameRoom } from "../../firebase/helpers";
import { calculateScore, shuffleCards } from "../../utils/utils";
import "./CardStack.css";

const CardStack = () => {
  const { gameRoomId, gameRoomDetails } = useContext(RoomContext);
  const { currentPlayer } = useContext(PlayersContext);

  const handleClickPickCard = async () => {
    const updatedDeck = shuffleCards([...gameRoomDetails.cards]);
    const randomlyPickedCard = updatedDeck.pop();
    const updatedPlayerCards = [...currentPlayer.cards, randomlyPickedCard];
    const updatedPlayerScore = calculateScore(updatedPlayerCards);

    const updatedCurrentPlayer = {
      ...currentPlayer,
      cards: updatedPlayerCards,
      score: updatedPlayerScore,
      isMyTurn: false,
      isMyTurnToPick: false
    };
    let nextPlayersIndex = 0;
    gameRoomDetails.players.forEach((player, index) => {
      if (currentPlayer.uid === player.uid) {
        nextPlayersIndex = (index + 1) % gameRoomDetails.players.length;
      }
    });
    const playerWithNextTurn = {
      ...gameRoomDetails.players[nextPlayersIndex],
      isMyTurn: true
    };
    const updatedGameRoomDetails = {
      ...gameRoomDetails,
      players: gameRoomDetails.players.map((player) => {
        return player.uid === currentPlayer.uid
          ? updatedCurrentPlayer
          : player.uid === playerWithNextTurn.uid
          ? playerWithNextTurn
          : player;
      }),
      cards: updatedDeck
    };
    await updateGameRoom(gameRoomId, updatedGameRoomDetails);
  };

  return (
    <div
      className="cardstack"
      onClick={
        currentPlayer.isMyTurn && currentPlayer.isMyTurnToPick
          ? handleClickPickCard
          : null
      }
    >
      <img src={`images/cards/back.svg`} alt="Card Stack" />
      <img src={`images/cards/back.svg`} alt="Card Stack" />
      <img src={`images/cards/back.svg`} alt="Card Stack" />
      <img src={`images/cards/back.svg`} alt="Card Stack" />
      <img src={`images/cards/back.svg`} alt="Card Stack" />
    </div>
  );
};

export default CardStack;
