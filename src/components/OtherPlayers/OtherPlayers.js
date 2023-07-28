import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";
import { RoomContext } from "../../contexts/RoomContext";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import "./OtherPlayers.css";

const OtherPlayers = () => {
  const { currentPlayer } = useContext(PlayersContext);
  const { gameRoomDetails } = useContext(RoomContext);

  return (
    <div className="otherplayers">
      {gameRoomDetails.players
        .filter((player) => player.uid !== currentPlayer.uid)
        .map((player) => (
          <div key={player.uid} className="otherplayers_details">
            <Tooltip
              title={player.isMyTurn ? "Currently Playing" : ""}
              open={player.isMyTurn}
              placement="top"
              style={{ marginBottom: "2px" }}
            >
              <div className="otherplayers_detailsWrapper">
                <div className="otherplayers_detailsUsername">
                  {player.name}
                </div>
                <PlayerAvatar player={player} />
                <div className="otherplayers_cardsNumber">
                  {player.cards?.length}
                </div>
              </div>
            </Tooltip>
          </div>
        ))}
    </div>
  );
};

export default OtherPlayers;
