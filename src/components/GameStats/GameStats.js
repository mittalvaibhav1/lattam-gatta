import "./GameStats.css";
import LeaderBoard from "../LeaderBoard/LeaderBoard";

const GameStats = ({ showGameStats }) => {
  return (
    <div className={showGameStats ? "gamestats open" : "gamestats"}>
      <h1 className="gamestats__header">Game Stats</h1>
      <LeaderBoard />
    </div>
  );
};

export default GameStats;
