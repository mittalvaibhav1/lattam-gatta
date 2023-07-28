import "./AvatarSelector.css";
import { Fragment } from "react";
import { AVATARS } from "../../constants/avatars";

const AvatarSelector = ({ selectedAvatar, setSelectedAvatar, onLoad }) => {
  return (
    <Fragment>
      <h3>Choose you Avatar</h3>
      <div className="avatarselector">
        {AVATARS.map((avatar) => (
          <div
            key={avatar.id}
            onClick={() => setSelectedAvatar(avatar.id)}
            className="avatarselector__Avatar"
          >
            <img
              className={selectedAvatar === avatar.id ? "avatarSelected" : ""}
              src={`images/avatars/${avatar.src}`}
              alt={avatar.id}
              onLoad={selectedAvatar === avatar.id ? onLoad : null}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default AvatarSelector;
