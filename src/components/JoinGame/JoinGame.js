import "./JoinGame.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactlessIcon from "@mui/icons-material/Contactless";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputBox from "../InputBox/InputBox";
import Button from "../Button/Button";
import { useContext, useEffect, useState } from "react";
import AvatarSelector from "../AvatarSelector/AvatarSelector";
import { v4 as uuidv4 } from "uuid";
import { PlayersContext } from "../../contexts/PlayersContext";
import { useSnackbar } from "notistack";
import { ALERT_VARIANTS } from "../../constants/alertVariants";
import randomstring from "randomstring";
import { RoomContext } from "../../contexts/RoomContext";
import { isValidGameCode } from "../../firebase/helpers";
import { LoaderContext } from "../../contexts/LoaderContext";
import HowToPlay from "../HowToPlay/HowToPlay";

const JoinGame = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("1");
  const [joinGameCode, setJoinGameCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { setShowLoader } = useContext(LoaderContext);
  const { setCurrentPlayer } = useContext(PlayersContext);
  const { setGameRoomCode } = useContext(RoomContext);

  const { enqueueSnackbar } = useSnackbar();

  const setAndValidateUser = () => {
    if (username.length < 3 || username.length > 20) {
      enqueueSnackbar(
        "Username Validation: Enter a Valid Username (3-20 Characters)",
        ALERT_VARIANTS.ERROR
      );
      return false;
    } else {
      const user = {
        uid: userId,
        avatar: selectedAvatar,
        name: username,
        score: 0,
        isActive: true,
        isMyTurn: false,
        wins: 0,
        cards: []
      };
      setCurrentPlayer(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  };

  const generateGameCode = async () => {
    const gameCode = randomstring.generate({
      length: 6
    });
    return !(await isValidGameCode(gameCode))
      ? gameCode
      : await generateGameCode();
  };

  const handleClickCreateGame = async () => {
    if (setAndValidateUser()) {
      const gameCode = await generateGameCode();
      setGameRoomCode(gameCode);
    }
  };

  const handleClickJoinGame = async () => {
    if (setAndValidateUser()) {
      if (joinGameCode.length !== 6 || !(await isValidGameCode(joinGameCode))) {
        enqueueSnackbar(
          "Game Code Validation: Enter a valid Game Code",
          ALERT_VARIANTS.ERROR
        );
      } else {
        setGameRoomCode(joinGameCode);
      }
    }
  };

  const handleClickHowToPlay = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUserId(user.uid);
      setUsername(user.name);
      setSelectedAvatar(user.avatar);
    } else {
      setUserId(uuidv4());
    }
    if (localStorage.getItem("joinCode") !== null) {
      setJoinGameCode(localStorage.getItem("joinCode"));
    }
  }, []);

  return (
    <div className="joingame">
      {showModal && <HowToPlay setShowModal={setShowModal} />}
      <div className="joingame__logo">
        <img src="images/banner.png" alt="banner" />
      </div>
      <div className="joingame_playermenu">
        <h3>Player Name</h3>
        <InputBox
          Icon={AccountCircleIcon}
          name="uname"
          placeholder="Enter a name"
          value={username}
          setValue={setUsername}
        />
        <AvatarSelector
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
          onLoad={() => {
            setShowLoader(false);
          }}
        />
        <Button onClick={handleClickCreateGame}>Create a new game</Button>
        <InputBox
          Icon={ContactlessIcon}
          name="gcode"
          placeholder="Enter game code eg : 3sda2c"
          value={joinGameCode}
          setValue={setJoinGameCode}
        />
        <Button onClick={handleClickJoinGame} background="#1BD761">
          Join using Code
        </Button>
        <Button onClick={handleClickHowToPlay} background="#FF5F5F">
          <HelpOutlineIcon style={{ marginRight: "5px" }} />
          How to Play
        </Button>
      </div>
    </div>
  );
};

export default JoinGame;
