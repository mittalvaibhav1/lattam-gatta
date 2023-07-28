import { Fragment, useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import GameFinish from "../GameFinish/GameFinish";
import GameStatusBar from "../GameStatusBar/GameStatusBar";
import Lobby from "../Lobby/Lobby";
import OtherPlayers from "../OtherPlayers/OtherPlayers";
import Playground from "../Playground/Playgroud";
import "./LiveGame.css";

const LiveGame = () => {
  const { gameRoomDetails } = useContext(RoomContext);
  return gameRoomDetails.isGameStarted ? (
    !gameRoomDetails.isGameFinished ? (
      <Fragment>
        <GameStatusBar />
        <OtherPlayers />
        <Playground />
      </Fragment>
    ) : (
      <GameFinish />
    )
  ) : (
    <Lobby />
  );
};

export default LiveGame;
