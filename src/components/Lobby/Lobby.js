import "./Lobby.css";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { ALERT_VARIANTS } from "../../constants/alertVariants";
import { Breathing } from "react-shimmer";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../contexts/LoaderContext";
import { RoomContext } from "../../contexts/RoomContext";
import { PlayersContext } from "../../contexts/PlayersContext";
import { updateGameRoom } from "../../firebase/helpers";
import { distributeCards } from "../../utils/utils";
import { DECK } from "../../constants/deck";

const Lobby = () => {
  const { gameRoomDetails, setGameRoomCode, gameRoomId } = useContext(
    RoomContext
  );
  const { currentPlayer } = useContext(PlayersContext);
  const { setShowLoader } = useContext(LoaderContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClickCopy = () => {
    navigator.clipboard.writeText(gameRoomDetails.gameCode);
    enqueueSnackbar("Gamecode Copied!", ALERT_VARIANTS.SUCCESS);
  };

  const handleClickBack = () => {
    setGameRoomCode("");
    setShowLoader(true);
    navigate(-1);
  };

  const handleClickStart = async () => {
    const [updatedCards, updatedPlayers] = distributeCards(
      DECK,
      gameRoomDetails.players,
      gameRoomDetails.lastWinner
        ? gameRoomDetails.lastWinner.uid
        : currentPlayer.uid
    );
    const firstPlayedCard = updatedCards.pop();
    const updatedGameRoom = {
      ...gameRoomDetails,
      isGameStarted: true,
      players: updatedPlayers,
      cards: updatedCards,
      cardsPlayed: [
        {
          cards: [firstPlayedCard],
          playedBy: "default"
        }
      ]
    };
    await updateGameRoom(gameRoomId, updatedGameRoom);
  };

  return (
    <div className="lobby">
      <div className="lobby__header">
        <span> Waiting for other players... </span>
        <div className="lobby__headerCode">
          <span>{gameRoomDetails.gameCode}</span>
          <ContentCopyIcon onClick={handleClickCopy} />
        </div>
      </div>
      <div className="lobby__body">
        <div className="lobby__bodyPlayers">
          {gameRoomDetails.players?.map((player) => (
            <div key={player.uid} className="lobby__bodyPlayersPlayer">
              <img
                src={`images/avatars/${player.avatar}.svg`}
                alt={player.name}
                onLoad={() => setShowLoader(false)}
              />
              {gameRoomDetails.roomAdmin === player.uid && (
                <div className="lobby__bodyPlayersPlayerAdmin">Host</div>
              )}
              <span>{player.name}</span>
            </div>
          ))}
          <div className="lobby__bodyPlayersPlayer">
            <Breathing className="lobby__bodyPlayersPlayerImage" />
            <span>
              <Breathing className="lobby__bodyPlayersPlayerName" />
            </span>
          </div>
        </div>
        <div className="lobby__bodyMenu">
          <KeyboardDoubleArrowLeftIcon onClick={handleClickBack} />
          <button
            className="lobby__bodyMenuSubmit"
            onClick={handleClickStart}
            disabled={
              gameRoomDetails.roomAdmin !== currentPlayer?.uid ||
              gameRoomDetails.players?.length < 2
            }
          >
            Start Game
          </button>
          <CircularProgress />
        </div>
      </div>
    </div>
  );
};

export default Lobby;
