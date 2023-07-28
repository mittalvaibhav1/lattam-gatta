import { useContext, useEffect } from "react";
import { LoaderContext } from "../../contexts/LoaderContext";
import "./HowToPlay.css";
import CancelIcon from "@mui/icons-material/Cancel";

const HowToPlay = ({ setShowModal }) => {
  const { setShowLoader } = useContext(LoaderContext);
  useEffect(() => {
    setShowLoader(false);
  });
  return (
    <div className="howtoplay">
      <div className="howtoplay__close">
        <CancelIcon onClick={() => setShowModal(false)} fontSize="large" />
      </div>
      <div className="howtoplay__header">How-to-Play?</div>
      <div className="howtoplay__rules">
        <h2>Objective:</h2>
        <p>
          The objective of the game is to minimize your score by strategically
          playing cards in sets or showing your cards when you believe your
          score is the lowest. Each card has a score associated with it based on
          its number, with the Joker having a score of zero and the King (K)
          having a score of 13.
        </p>

        <h2>Gameplay:</h2>
        <ol>
          <li>Each player gets 5 cards.</li>
          <li>
            On a player's turn, they have two options:
            <ul>
              <li>
                <strong>Show Cards:</strong> The player can decide to show their
                cards, indicating that they believe they have the lowest score.
                The game ends immediately when a player chooses to show their
                cards, and the scores are calculated for all players. Players
                having the lowest score win the game, in case of ties, the
                player who decided to show their cards looses, everyone else
                with minimum score wins.
              </li>
              <li>
                <strong>Play Move:</strong> If the player does not wish to show
                their cards, they can play a move by placing down a set of cards
                from their hand. After which they have to mandatorily pick a
                card either from the set of cards played by the player before
                them or from the deck.
              </li>
            </ul>
          </li>
          <li>
            <strong>Playing Moves:</strong> When a player chooses to play a
            move, they can play either 1 card, 2 cards, 3 cards, or 5 cards from
            their hand. The rules for each move are as follows:
            <ul>
              <li>
                <strong>1 Card:</strong> A player can directly play one card
                from their hand. There are no restrictions on the card they
                choose to play. For example:
                <br />
                <img src="images/cards/KH.svg" alt="KH" />
              </li>
              <li>
                <strong>2 Cards:</strong> The player must play two cards with
                the same number. For example, two 4s or two Queens can be played
                together.
                <br />
                <img src="images/cards/QS.svg" alt="QS" />{" "}
                <img src="images/cards/QC.svg" alt="QC" />
              </li>
              <li>
                <strong>3 Cards:</strong> The player must play three cards of
                the same suit that are in sequence. For example, 1, 2, and 3 of
                hearts or 4, 5, and 6 of diamonds can be played together. For
                example:
                <br />
                <img src="images/cards/4S.svg" alt="4S" />{" "}
                <img src="images/cards/5S.svg" alt="5S" />{" "}
                <img src="images/cards/6S.svg" alt="6S" />
              </li>
              <li>
                <strong>5 Cards:</strong> The player must play five cards that
                are in consecutive order regardless of suit. For example, 2, 3,
                4, 5, and 6 of any combination of suits can be played together.
                For example:
                <br />
                <img src="images/cards/2S.svg" alt="2S" />{" "}
                <img src="images/cards/3H.svg" alt="3H" />{" "}
                <img src="images/cards/4C.svg" alt="4C" />{" "}
                <img src="images/cards/5D.svg" alt="5D" />{" "}
                <img src="images/cards/6H.svg" alt="6H" />
              </li>
            </ul>
          </li>
          <li>
            <strong>Using the Joker:</strong> If a player has the Joker card,
            they can use it to substitute any other card to form a valid pattern
            for playing a move. For example, if they have 1 of hearts and 3 of
            hearts and need a 2 of hearts to play a 3-card move, they can use
            the Joker to substitute the missing card and play:
            <br />
            <img src="images/cards/2H.svg" alt="2H" />{" "}
            <img src="images/cards/JKR.svg" alt="Joker" />{" "}
            <img src="images/cards/3H.svg" alt="3H" />
          </li>
        </ol>
      </div>
    </div>
  );
};

export default HowToPlay;
