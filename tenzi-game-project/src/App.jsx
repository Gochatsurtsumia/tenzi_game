import React from "react";
import Die from "../components/die";
import "./index.css";
import { nanoid } from "nanoid";
export default function App() {
  const [numbers, setNumbers] = React.useState(generateNumbers());
  function generateNumbers() {
    let numbersArr = [];
    for (let i = 0; i < 10; i++) {
      numbersArr.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return numbersArr;
  }
  function changeNumbers() {
    setNumbers((oldNumbers) =>
      oldNumbers.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }
  function hold(id) {
    setNumbers((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  const diceElements = numbers.map((dieObject) => (
    <Die hold={() => hold(dieObject.id)} isHeld={dieObject.isHeld} key={dieObject.id} value={dieObject.value} />
  ));
  return (
    <main>
      <div className="dice-elements">{diceElements}</div>
      <button onClick={changeNumbers} id="update-button">
        Dice
      </button>
    </main>
  );
}
