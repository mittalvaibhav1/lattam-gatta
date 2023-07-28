import { useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";
import { RoomContext } from "../../contexts/RoomContext";
import { updateGameRoom } from "../../firebase/helpers";
import { calculateScore } from "../../utils/utils";
import PlayedCardsGroup from "../PlayedCardsGroup/PlayedCardsGroup";
import "./PlayedCards.css";

const PlayedCards = () => {
  const { gameRoomId, gameRoomDetails } = useContext(RoomContext);
  const { currentPlayer } = useContext(PlayersContext);

  const handleClickPickCard = async (selectedCard) => {
    let selectedPlayedCardGroup = gameRoomDetails.cardsPlayed.splice(0, 1)[0];
    selectedPlayedCardGroup.cards = selectedPlayedCardGroup.cards.filter(
      (card) => card.card !== selectedCard.card
    );
    let updatedPlayedCards = [];
    if (!selectedPlayedCardGroup.cards?.length) {
      updatedPlayedCards = [...gameRoomDetails.cardsPlayed];
    } else {
      updatedPlayedCards = [
        selectedPlayedCardGroup,
        ...gameRoomDetails.cardsPlayed
      ];
    }
    const updatedPlayerCards = [...currentPlayer.cards, selectedCard];
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
      cardsPlayed: updatedPlayedCards
    };
    await updateGameRoom(gameRoomId, updatedGameRoomDetails);
  };

  return (
    <div className="playedcards">
      {gameRoomDetails.cardsPlayed?.map((playedCardGroup, index) => (
        <PlayedCardsGroup
          key={index}
          onClick={
            index === 0 &&
            currentPlayer.isMyTurn &&
            currentPlayer.isMyTurnToPick
              ? handleClickPickCard
              : null
          }
          playedCardsGroup={playedCardGroup}
        />
      ))}
    </div>
  );
};

export default PlayedCards;
