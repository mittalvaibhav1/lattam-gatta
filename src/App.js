import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./styles.css";
import LiveGame from "./components/LiveGame/LiveGame";
import JoinGame from "./components/JoinGame/JoinGame";
import { SnackbarProvider } from "notistack";
import { useContext, useEffect } from "react";
import { PlayersContext } from "./contexts/PlayersContext";
import { useSearchParams } from "react-router-dom";

export default function App() {
  const { currentPlayer } = useContext(PlayersContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!currentPlayer) {
      const gameCode = searchParams.get("gameCode");
      if (gameCode) {
        localStorage.setItem("joinCode", gameCode);
      }
      navigate("/");
    }
  }, [currentPlayer]);

  return (
    <div className="app">
      <SnackbarProvider maxSnack={1}>
        <Routes>
          <Route path="/live" element={<LiveGame />} />
          <Route path="/" element={<JoinGame />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}
