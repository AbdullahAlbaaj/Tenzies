import Die from "./Die";
import { useState, useEffect } from "react";
export default function Main() {
  const numOfDies = 10;
  const [diesState, setDiesState] = useState(Array(numOfDies).fill(0).map(_ => ({value: Math.floor((Math.random() * 6)) + 1, isHeld: false})));
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    const heldDies = diesState.filter((die) => die.isHeld);
    if (heldDies.length === numOfDies && heldDies.every(die => die.value === heldDies[0]['value'])) setIsFinished(true);
  }, [diesState]);
  function handleHeld(e) {
    const id = e.currentTarget.id;
    const v = e.currentTarget.textContent;
    setDiesState(prev => prev.map((die, index) => {
      return +id === index ? {...die, isHeld: !die.isHeld} : die;
    }));
  }
  function handleRoll() {
    setDiesState(prevDies => prevDies.map((die) => {
      if (die.isHeld) return die;
      else return {value: Math.floor(Math.random() * 6) + 1, isHeld: false};
    }));
  }
  function handleNewGame() {
    setDiesState(() => Array(numOfDies).fill(0).map((_) => ({value: Math.floor(Math.random() * 6) + 1, isHeld: false})));
    setIsFinished(false);
  }
  return (
    <main>
      <div className="container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dies">
          { diesState.map((die, i) => <Die key={i} id={i} onClick={handleHeld} isHeld={die.isHeld} value={die.value} />) }
        </div>
        { !isFinished && <button onClick={handleRoll} className="roll">Roll</button> }
        { isFinished && <button className="new-game" onClick={handleNewGame}>New Game</button> }
      </div>
    </main>
  );
}