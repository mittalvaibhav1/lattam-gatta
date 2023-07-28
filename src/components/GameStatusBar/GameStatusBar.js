import "./GameStatusBar.css";
import { useContext, useEffect, useState } from "react";
import GameStats from "../GameStats/GameStats";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../../contexts/RoomContext";
import { useSnackbar } from "notistack";
import { ALERT_VARIANTS } from "../../constants/alertVariants";
import { PlayersContext } from "../../contexts/PlayersContext";

const GameStatusBar = () => {
  const [showGameStats, setShowGameStats] = useState(false);
  const { gameRoomDetails } = useContext(RoomContext);
  const { currentPlayer } = useContext(PlayersContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  let spoken = false;

  const playerWithCurrentTurn = gameRoomDetails.players.find(
    (player) => player.isMyTurn
  );

  const handleClickCopy = () => {
    navigator.clipboard.writeText(gameRoomDetails.gameCode);
    enqueueSnackbar("Gamecode Copied!", ALERT_VARIANTS.SUCCESS);
  };

  useEffect(() => {
    const message = playerWithCurrentTurn.isMyTurnToPick
      ? `${playerWithCurrentTurn.name} is Picking Cards right now`
      : `${playerWithCurrentTurn.name} is Playing right now`;
    enqueueSnackbar(message, ALERT_VARIANTS.GAME_FINISH);
    if (
      currentPlayer?.uid === playerWithCurrentTurn.uid &&
      !playerWithCurrentTurn.isMyTurnToPick &&
      !spoken
    ) {
      const synth = window.speechSynthesis;
      synth.speak(
        new SpeechSynthesisUtterance(
          `It's your turn to play now, ${currentPlayer.name} `
        )
      );
      spoken = true;
    } else {
      spoken = false;
    }
  }, [gameRoomDetails]);

  const handleClickExit = () => {
    // navigate("/");
  };
  return (
    <div className="gamestatusbar">
      <div className="gamestatusbar__left">
        <Tooltip title="Game Stats">
          <InfoIcon
            color="primary"
            onClick={() => setShowGameStats(!showGameStats)}
          />
        </Tooltip>
        <GameStats showGameStats={showGameStats} />
      </div>
      <div className="gamestatusbar__middle">
        Waiting for <span>{playerWithCurrentTurn.name}</span>{" "}
        {playerWithCurrentTurn.isMyTurnToPick
          ? "to pick a card"
          : "to play their turn"}
      </div>
      <div className="gamestatusbar__right">
        <div className="gamestatusbar__rightSpectators">
          <Tooltip title="Live Speactators">
            <VisibilityIcon htmlColor="#81c784" />
          </Tooltip>
          <span>0</span>
        </div>
        <Tooltip title="Share Link">
          <ShareIcon onClick={handleClickCopy} />
        </Tooltip>
        <Tooltip title="Exit">
          <CancelIcon color="error" onClick={handleClickExit} />
        </Tooltip>
      </div>
    </div>
  );
};

export default GameStatusBar;
