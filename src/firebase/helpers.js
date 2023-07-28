import db from "./firebase";

export const addGameRoom = async (roomDetails) => {
  return await db.collection("gameRooms").add({
    ...roomDetails
  });
};

export const updateGameRoom = async (gameRoomId, roomDetails) => {
  return db
    .collection("gameRooms")
    .doc(gameRoomId)
    .update({
      ...roomDetails
    });
};

export const fetchGameRoomByGameCode = async (gameCode) => {
  return db.collection("gameRooms").where("gameCode", "==", gameCode);
};

export const isValidGameCode = async (gameCode) => {
  const isValid = !(await (await fetchGameRoomByGameCode(gameCode)).get())
    .empty;
  return isValid;
};

export const fetchReactions = async (gameRoomId) => {
  return db.collection("gameRooms").doc(gameRoomId).collection("reactions");
};

export const addReaction = async (gameRoomId, reaction) => {
  return db
    .collection("gameRooms")
    .doc(gameRoomId)
    .collection("reactions")
    .add({
      ...reaction
    });
};
