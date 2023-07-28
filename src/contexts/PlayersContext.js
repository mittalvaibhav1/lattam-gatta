import { createContext, useState } from "react";

export const PlayersContext = createContext();

const PlayersContextProvider = (props) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  return (
    <PlayersContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {props.children}
    </PlayersContext.Provider>
  );
};

export default PlayersContextProvider;
