import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

import "./index.css";
import Die from "./Die.js";

export default function App() {
  const [dice, setDices] = React.useState(allNewDices());
  const [tenzies, settenzies] = React.useState(false);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDices() {
    const arrNum = [];
    for (let i = 1; i < 11; i++) {
      arrNum.push(generateNewDie());
    }
    return arrNum;
  }

  function rollDice() {
    if (tenzies === false) {
      setDices((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      settenzies(false);
      setDices(allNewDices());
    }
  }

  function holdDice(id) {
    setDices((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSame = dice.every((die) => die.value === firstValue);
    if (allHeld && allSame) settenzies(true);
  });

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {tenzies
          ? "Congratulations!!! You won"
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls"}
      </p>
      <div className="die-container">{diceElements}</div>
      <button className="btn-roll" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
