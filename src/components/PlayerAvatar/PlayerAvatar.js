import "./PlayerAvatar.css";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const PlayerAvatar = ({ player, showReactions = null }) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: player?.isActive ? "#44b700" : "#f5412a",
      color: player?.isActive ? "#44b700" : "#f5412a",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""'
      }
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0
      }
    }
  }));
  return (
    <div
      onMouseEnter={showReactions ? () => showReactions(true) : null}
      onMouseLeave={showReactions ? () => showReactions(false) : null}
      className="playeravatar"
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar
          player={player}
          alt={player?.name}
          style={player?.isMyTurn ? { border: "2px solid #44b700" } : {}}
          src={`images/avatars/${player?.avatar}.svg`}
        />
      </StyledBadge>
    </div>
  );
};

export default PlayerAvatar;
