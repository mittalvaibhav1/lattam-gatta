import PlayerAvatar from "../PlayerAvatar/PlayerAvatar";
import "./PlayerProfile.css";

const PlayerProfile = ({ player }) => {
  return (
    <div className="playerprofile">
      <PlayerAvatar player={player} />
      <div className="playerprofile__name"> {player?.name} </div>
      <div className="playerprofile__score">
        Score:
        <h1>{player?.score} </h1>
      </div>
    </div>
  );
};

export default PlayerProfile;
