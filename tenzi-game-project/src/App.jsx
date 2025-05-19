import React, { useRef } from "react";
import Die from "../components/die";
import "./index.css";
import { nanoid } from "nanoid";
export default function App() {
  const [numbers, setNumbers] = React.useState(() => generateNumbers());

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
    if (!hasWon) {
      setNumbers((oldNumbers) =>
        oldNumbers.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setNumbers(generateNumbers());
    }
  }
  function hold(id) {
    setNumbers((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  const diceElements = numbers.map((dieObject) => (
    <Die
      hold={() => hold(dieObject.id)}
      isHeld={dieObject.isHeld}
      key={dieObject.id}
      value={dieObject.value}
    />
  ));
  const hasWon =
    numbers.every((die) => die.isHeld) &&
    numbers.every((die) => die.value === numbers[0].value);
  const fireworks = hasWon ? (
    <div className="firework-container">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="firework"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}
    </div>
  ) : null;
  const buttonFocus = useRef(null);
  React.useEffect(() => {
    if (hasWon) {
      buttonFocus.current.focus();
    }
  }, [hasWon]);
  return (
    <main>
      <h1>Tenzi Game</h1>
      {fireworks}
      <div aria-live="polite" className="sr-only">
        {hasWon && <p>Congrats, you have won </p>}
      </div>
      <div className="dice-elements">{diceElements}</div>
      <button ref={buttonFocus} onClick={changeNumbers} id="update-button">
        {hasWon ? "New game" : "Dice"}
      </button>
    </main>
  );
}
