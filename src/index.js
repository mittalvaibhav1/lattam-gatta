import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PlayersContextProvider from "./contexts/PlayersContext";
import RoomContextProvider from "./contexts/RoomContext";
import LoaderContextProvider from "./contexts/LoaderContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <LoaderContextProvider>
        <PlayersContextProvider>
          <RoomContextProvider>
            <App />
          </RoomContextProvider>
        </PlayersContextProvider>
      </LoaderContextProvider>
    </BrowserRouter>
  </StrictMode>
);
