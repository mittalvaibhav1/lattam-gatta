import { useContext, useEffect } from "react";
import { LoaderContext } from "../../contexts/LoaderContext";
import CardStack from "../CardStack/CardStack";
import PlayedCards from "../PlayedCards/PlayedCards";
import PlayerArea from "../PlayerArea/PlayerArea";
import "./Playground.css";

const Playground = () => {
  const { setShowLoader } = useContext(LoaderContext);

  useEffect(() => {
    setShowLoader(false);
  });

  return (
    <div className="playground">
      <div className="playground_inner">
        <PlayedCards />
      </div>
      <div className="playground_items">
        <CardStack />
        <PlayerArea />
      </div>
    </div>
  );
};

export default Playground;
