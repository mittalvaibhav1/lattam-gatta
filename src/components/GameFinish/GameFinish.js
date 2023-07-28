import { Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { ALERT_VARIANTS } from "../../constants/alertVariants";
import { LoaderContext } from "../../contexts/LoaderContext";
import { PlayersContext } from "../../contexts/PlayersContext";
import { RoomContext } from "../../contexts/RoomContext";
import { updateGameRoom } from "../../firebase/helpers";
import "./GameFinish.css";

const GameFinish = () => {
  const { gameRoomId, gameRoomDetails } = useContext(RoomContext);
  const { enqueueSnackbar } = useSnackbar();
  const { setShowLoader } = useContext(LoaderContext);
  const { currentPlayer } = useContext(PlayersContext);

  useEffect(() => {
    setShowLoader(false);
    const playerWithCurrentTurn = gameRoomDetails.players.find(
      (player) => player.isMyTurn
    );
    enqueueSnackbar(
      `${playerWithCurrentTurn.name} decided to show cards!`,
      ALERT_VARIANTS.GAME_FINISH
    );
  }, []);

  const handleClickAnotherRound = async () => {
    const updatedGameRoomDetails = {
      ...gameRoomDetails,
      winners: [],
      isGameFinished: false,
      isGameStarted: false
    };
    enqueueSnackbar(
      `Attention: New round is starting!`,
      ALERT_VARIANTS.GAME_FINISH
    );
    await updateGameRoom(gameRoomId, updatedGameRoomDetails);
  };

  return (
    <div className="gamefinish">
      <div className="gamefinish__header">That's all folks!</div>
      <button
        onClick={handleClickAnotherRound}
        className="gamefinish_nextround"
        disabled={
          gameRoomDetails.roomAdmin !== currentPlayer?.uid ||
          gameRoomDetails.players?.length < 2
        }
      >
        Another Round?
      </button>
      <div className="gamefinish__note">
        {" "}
        Note: only the host can start the next round
      </div>
      <div className="gamefinish__winners">
        <h3>Winners</h3>
        {gameRoomDetails?.winners.map((player) => (
          <div key={player.uid} className="gamefinish__winner">
            <img
              src={`images/avatars/${player.avatar}.svg`}
              alt={player.name}
            />
            <span>{player.name}</span>
            <span>Score: {player.score}</span>
          </div>
        ))}
      </div>
      <div className="gamefinish__winners">
        <h3>All Players</h3>
        {gameRoomDetails?.players
          .sort((a, b) => a.score - b.score)
          .map((player) => (
            <div key={player.uid} className="gamefinish__winner">
              <img
                src={`images/avatars/${player.avatar}.svg`}
                alt={player.name}
              />
              {gameRoomDetails.roomAdmin === player.uid && (
                <div className="gamefinish__winnerAdmin">Host</div>
              )}
              <span>{player.name}</span>
              <span>Score: {player.score}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameFinish;
