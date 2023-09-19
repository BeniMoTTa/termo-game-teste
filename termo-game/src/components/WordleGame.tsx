import React, { useState } from "react";

const WORD_TO_GUESS = "HELLO";
const MAX_ATTEMPTS = 6;

export function WordleGame() {
  const [guess, setGuess] = useState(["", "", "", "", ""]);
  const [feedback, setFeedback] = useState(["", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeRow, setActiveRow] = useState(0);
  const [command, setCommando] = useState("");
  const handleInputChange = (index: number, value: string) => {
    if (!gameOver && activeRow < guess.length) {
      const newGuess = [...guess];
      newGuess[activeRow] = value.toUpperCase();
      setGuess(newGuess);
    }
  };

  const checkGuess = () => {
    if (gameOver) return;

    const newAttempts = attempts + 1;
    const newFeedback = [];

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === WORD_TO_GUESS[i]) {
        newFeedback[i] = "correct";
      } else if (WORD_TO_GUESS.includes(guess[i])) {
        newFeedback[i] = "wrongPosition";
      } else {
        newFeedback[i] = "";
      }
    }

    setFeedback(newFeedback);
    setAttempts(newAttempts);
    setActiveRow(activeRow + 1);

    if (guess.join("") === WORD_TO_GUESS) {
      alert(
        `Parabéns! Você adivinhou a palavra "${WORD_TO_GUESS}" em ${newAttempts} tentativas.`
      );
      setGameOver(true);
    } else if (newAttempts >= MAX_ATTEMPTS) {
      alert(`Game Over! A palavra correta era "${WORD_TO_GUESS}".`);
      setGameOver(true);
    }
  };

  const keyboardLetters = "QWERTYUIOPASDFGHJKLÇZXCVBNM";

  return (
    <div className="text-center mt-12">
      <div className="flex justify-center">
        {feedback.map((f, index) => (
          <div
            key={index}
            className={`w-16 h-16 p-4 border bg-[white] border-black m-2 ${
              f === "correct"
                ? "bg-green-400"
                : f === "wrongPosition"
                ? "bg-yellow-400"
                : ""
            }`}
          >
            {guess[index]}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-wrap w-[700px] text-[white]">
            {Array.from(keyboardLetters).map((letter, index) => (
              <button
                key={index}
                className="w-12 h-12 p-2 text-3xl rounded-lg border-2 border-black m-2"
                onClick={() => handleInputChange(activeRow, letter)}
                disabled={
                  gameOver || activeRow >= guess.length || !!guess[activeRow]
                }
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-bold rounded"
        onClick={checkGuess}
        disabled={
          gameOver ||
          activeRow >= guess.length ||
          guess[activeRow].trim() === ""
        }
      >
        Submit Guess
      </button>
    </div>
  );
}
