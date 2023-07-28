import { createContext, useContext, useEffect, useState } from "react";
import {
  addGameRoom,
  fetchGameRoomByGameCode,
  isValidGameCode,
  updateGameRoom
} from "../firebase/helpers";
import { DECK } from "../constants/deck";
import { PlayersContext } from "./PlayersContext";
import { isPlayerProfileSame, shuffleCards } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "./LoaderContext";
import { debounce } from "lodash";

export const RoomContext = createContext();

const RoomContextProvider = (props) => {
  const [gameRoomCode, setGameRoomCode] = useState("");
  const [gameRoomDetails, setGameRoomDetails] = useState({});
  const [gameRoomId, setGameRoomId] = useState("");
  const { currentPlayer, setCurrentPlayer } = useContext(PlayersContext);
  const { setShowLoader } = useContext(LoaderContext);
  const navigate = useNavigate();

  const findUpdateOrAddCurrentPlayer = async (
    gameRoomDocumentId,
    gameRoomData
  ) => {
    const remoteCurrentPlayer = gameRoomData.players.find(
      (player) => player.uid === currentPlayer.uid
    );
    if (!remoteCurrentPlayer) {
      const updatedGameRoomData = {
        ...gameRoomData,
        players: [...gameRoomData.players, currentPlayer]
      };
      await updateGameRoom(gameRoomDocumentId, updatedGameRoomData);
    } else if (!isPlayerProfileSame(currentPlayer, remoteCurrentPlayer)) {
      setCurrentPlayer(() => remoteCurrentPlayer);
    }
  };

  const findUpdateOrAddCurrentPlayerDebounced = debounce(
    findUpdateOrAddCurrentPlayer,
    500
  );

  useEffect(() => {
    if (gameRoomCode) {
      setShowLoader(true);
      navigate(`/live?gameCode=${gameRoomCode}`);
      const asyncCallback = async () => {
        if (await isValidGameCode(gameRoomCode)) {
          (await fetchGameRoomByGameCode(gameRoomCode)).onSnapshot(
            async (snapshot) => {
              const gameRoomDocument = snapshot.docs.pop();
              const gameRoomDocumentId = gameRoomDocument.id;
              setGameRoomId(gameRoomDocumentId);
              const gameRoomData = gameRoomDocument.data();
              setGameRoomDetails(gameRoomData);
              await findUpdateOrAddCurrentPlayerDebounced(
                gameRoomDocumentId,
                gameRoomData
              );
            }
          );
        } else {
          const newGameRoom = {
            gameCode: gameRoomCode,
            isGameStarted: false,
            players: [],
            cards: [...shuffleCards(DECK)],
            roomAdmin: currentPlayer.uid,
            cardsPlayed: []
          };
          await addGameRoom(newGameRoom);
          await asyncCallback();
        }
      };
      asyncCallback();
    }
  }, [gameRoomCode]);

  return (
    <RoomContext.Provider
      value={{
        gameRoomDetails,
        setGameRoomCode,
        gameRoomId
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
