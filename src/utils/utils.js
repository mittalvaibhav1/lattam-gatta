import { isEqual, shuffle, groupBy, minBy } from "lodash";

export const isPlayerProfileSame = (oldPlayerProfile, newPlayerProfile) => {
  const isTrue = isEqual(oldPlayerProfile, newPlayerProfile);
  return isTrue;
};

export const shuffleCards = (deck) => {
  return shuffle(
    shuffle(
      shuffle(
        shuffle(shuffle(shuffle(shuffle(shuffle(shuffle(shuffle(deck)))))))
      )
    )
  );
};

export const calculateScore = (cards) => {
  let sum = 0;
  for (let card of cards) {
    sum += card.score;
  }
  return sum;
};

export const distributeCards = (cards, players, currentPlayerId) => {
  const updatedCards = shuffle([...cards]);
  const updatedPlayers = players.map((player) => {
    player.cards = updatedCards.splice(0, 5);
    player.score = calculateScore(player.cards);
    player.isMyTurn = player.uid === currentPlayerId;
    return player;
  });
  return [updatedCards, updatedPlayers];
};

const getCardSuit = ({ card }) => {
  return card.charAt(card.length - 1);
};

export const validateUserMove = (cardsPlayed) => {
  const jokers = cardsPlayed
    .filter((card) => card.score === 0)
    .sort((a, b) => a.score - b.score);
  const nonJokers = cardsPlayed
    .filter((card) => card.score !== 0)
    .sort((a, b) => a.score - b.score);
  if (cardsPlayed.length === 0 || cardsPlayed.length === 4) {
    return false;
  } else if (cardsPlayed.length === 2) {
    if (nonJokers.length < 2) {
      return true;
    }
    return nonJokers[0].score === nonJokers[1].score;
  } else if (cardsPlayed.length === 3) {
    let strikesAllowed = jokers.length;
    for (let i = 0; i < nonJokers.length - 1; i++) {
      if (getCardSuit(nonJokers[i]) !== getCardSuit(nonJokers[i + 1])) {
        return false;
      }
      if (nonJokers[i].score !== nonJokers[i + 1].score - 1) {
        const diff = nonJokers[i + 1].score - nonJokers[i].score - 1;
        strikesAllowed -= diff;
      }
    }
    return strikesAllowed >= 0;
  } else if (cardsPlayed.length === 5) {
    let strikesAllowed = jokers.length;
    for (let i = 0; i < nonJokers.length - 1; i++) {
      if (nonJokers[i].score !== nonJokers[i + 1].score - 1) {
        const diff = nonJokers[i + 1].score - nonJokers[i].score - 1;
        strikesAllowed -= diff;
      }
    }
    return strikesAllowed >= 0;
  }
  return true;
};

export const findPlayersWithMinScore = (players) => {
  const groupedByScore = groupBy(players, "score");
  const minScore = minBy(players, "score").score;
  return groupedByScore[minScore];
};
