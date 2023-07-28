import { useContext } from "react";
import { RoomContext } from "../../contexts/RoomContext";
import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const { gameRoomDetails } = useContext(RoomContext);
  return (
    <div className="leaderboard">
      <h2 className="leaderboard__header">Players</h2>
      <div className="leaderboard__players">
        {gameRoomDetails.players.map((player) => (
          <div key={player.uid} className="leaderboard__player">
            <PlayerAvatar player={player} />
            <h2 className="leaderboard__playerName">{player.name}</h2>
            <div className="leaderboard__playerWins">
              {player.wins}
              <span>wins</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
