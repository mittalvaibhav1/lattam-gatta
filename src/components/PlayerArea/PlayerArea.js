import { Fragment, useContext, useEffect, useState } from "react";
import { PlayersContext } from "../../contexts/PlayersContext";
import PlayerCards from "../PlayerCards/PlayerCards";
import PlayerProfile from "../PlayerProfile/PlayerProfile";
import { ReactionBarSelector } from "@charkour/react-reactions";
import "./PlayerArea.css";
import { REACTIONS } from "../../constants/reactions";
import Reaction from "../Reaction/Reaction";
import { addReaction, fetchReactions } from "../../firebase/helpers";
import { RoomContext } from "../../contexts/RoomContext";

const PlayerArea = () => {
  const { currentPlayer } = useContext(PlayersContext);
  const { gameRoomId } = useContext(RoomContext);
  const [currentReaction, setCurrentReaction] = useState({
    name: "Vaibhav Mittal",
    key: "dface"
  });
  const [showReaction, setShowReaction] = useState(false);
  const [emojiTimeout, setEmojiTimeout] = useState(null);

  useEffect(() => {
    if (gameRoomId) {
      const asyncCallback = async () => {
        (await fetchReactions(gameRoomId)).onSnapshot(async (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const reaction = change.doc.data();
            setShowReaction(true);
            setCurrentReaction(reaction);
          });
        });
      };
      asyncCallback();
    }
  }, []);

  useEffect(() => {
    if (showReaction) {
      if (emojiTimeout) {
        clearTimeout(emojiTimeout);
      }
      setEmojiTimeout(setTimeout(() => setShowReaction(false), 5000));
    }
  }, [showReaction]);

  const handleClickReaction = async (key) => {
    await addReaction(gameRoomId, {
      name: currentPlayer.name,
      key: key
    });
  };

  return (
    <Fragment>
      <Reaction
        reaction={currentReaction}
        className={showReaction ? "showEmoji" : ""}
      />
      <div className="playerarea">
        <ReactionBarSelector
          style={{
            position: "absolute",
            right: "2%",
            top: "60%",
            flexDirection: "column",
            transform: "translateY(-50%)"
          }}
          reactions={[...REACTIONS]}
          onSelect={(key) => {
            handleClickReaction(key);
          }}
        />
        <PlayerProfile player={currentPlayer} />
        <PlayerCards
          playerCards={currentPlayer?.cards}
          isMyTurn={currentPlayer.isMyTurn}
          isMyTurnToPick={currentPlayer.isMyTurnToPick}
        />
      </div>
    </Fragment>
  );
};

export default PlayerArea;
