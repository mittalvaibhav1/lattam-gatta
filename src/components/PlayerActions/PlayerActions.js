import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { ALERT_VARIANTS } from "../../constants/alertVariants";
import { PlayersContext } from "../../contexts/PlayersContext";
import { RoomContext } from "../../contexts/RoomContext";
import { updateGameRoom } from "../../firebase/helpers";
import {
  calculateScore,
  findPlayersWithMinScore,
  shuffleCards,
  validateUserMove
} from "../../utils/utils";
import "./PlayerActions.css";

const PlayerActions = ({ cards }) => {
  const { currentPlayer } = useContext(PlayersContext);
  const { gameRoomId, gameRoomDetails } = useContext(RoomContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickShow = async () => {
    let playersWithMinimumScore = findPlayersWithMinScore(
      gameRoomDetails.players
    );
    if (playersWithMinimumScore.length > 1) {
      playersWithMinimumScore = playersWithMinimumScore.filter(
        (player) => player.uid !== currentPlayer.uid
      );
    }
    const updatedGameRoomDetails = {
      ...gameRoomDetails,
      players: gameRoomDetails.players.map((currentExaminedPlayer) => {
        const isPlayerAWinner = playersWithMinimumScore.find(
          (winnerPlayer) => winnerPlayer.uid === currentExaminedPlayer.uid
        )
          ? true
          : false;
        if (isPlayerAWinner) {
          currentExaminedPlayer.wins = currentExaminedPlayer.wins + 1;
        }
        return currentExaminedPlayer;
      }),
      isGameFinished: true,
      winners: playersWithMinimumScore,
      lastWinner: playersWithMinimumScore[0]
    };
    await updateGameRoom(gameRoomId, updatedGameRoomDetails);
  };
  const handleClickPlay = async () => {
    const selectedCards = cards.filter((card) => card.isSelected);
    const isValidMove = validateUserMove(selectedCards);
    if (!isValidMove) {
      enqueueSnackbar("Game Validation: Invalid Move", ALERT_VARIANTS.WARNING);
    } else {
      const cardsPlayed = gameRoomDetails.cardsPlayed;
      let cardsToMoveToDeck = [];
      if (cardsPlayed.length > 1) {
        cardsToMoveToDeck = cardsPlayed.splice(0, 1)[0].cards;
      }
      cardsPlayed.push({
        playedBy: currentPlayer.uid,
        cards: selectedCards.map((card) => ({
          card: card.card,
          score: card.score
        }))
      });
      const updatedPlayerCards = cards
        .filter((card) => !card.isSelected)
        .map((card) => ({
          card: card.card,
          score: card.score
        }));
      const updatedPlayerScore = calculateScore(updatedPlayerCards);
      const updatedCurrentPlayer = {
        ...currentPlayer,
        cards: updatedPlayerCards,
        score: updatedPlayerScore,
        isMyTurnToPick: true
      };
      const updatedGameRoomDetails = {
        ...gameRoomDetails,
        cardsPlayed: cardsPlayed,
        players: gameRoomDetails.players.map((player) => {
          return player.uid === currentPlayer.uid
            ? updatedCurrentPlayer
            : player;
        }),
        cards: shuffleCards([...gameRoomDetails.cards, ...cardsToMoveToDeck])
      };
      await updateGameRoom(gameRoomId, updatedGameRoomDetails);
    }
  };

  return currentPlayer.isMyTurn && !currentPlayer.isMyTurnToPick ? (
    <div className="playeractions">
      <Button onClick={handleClickShow}>Show</Button>
      <Button onClick={handleClickPlay}>Play</Button>
    </div>
  ) : (
    <span></span>
  );
};

export default PlayerActions;
