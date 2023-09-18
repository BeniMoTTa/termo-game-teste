import React, { useState } from "react";

export function WordleGame() {
  const WORD_TO_GUESS = "HELLO";
  const MAX_ATTEMPTS = 6;

  const [guess, setGuess] = useState(["", "", "", "", ""]);
  const [feedback, setFeedback] = useState(["", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!gameOver) {
      const value = event.target.value.toUpperCase();
      const newGuess = [...guess];
      newGuess[index] = value;
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

    if (guess.join("") === WORD_TO_GUESS) {
      alert(
        `Parabéns! Você adivinhou a palavra "${WORD_TO_GUESS}" em ${newAttempts} tentativas.`
      );
    } else if (newAttempts >= MAX_ATTEMPTS) {
      alert(`Game Over! A palavra correta era "${WORD_TO_GUESS}".`);
      setGameOver(true);
    }
  };

  return (
    <div className="text-center mt-12">
      <div className="flex justify-center">
        {feedback.map((f, index) => (
          <div
            key={index}
            className={`w-16 h-16 p-4 rounded-full border bg-[white] border-black m-2 ${
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
        {guess.map((g, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-16 h-16 p-2 text-3xl rounded-lg border border-black mx-2"
            value={g}
            onChange={(event) => handleInputChange(index, event)}
            disabled={gameOver}
          />
        ))}
      </div>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white font-bold rounded"
        onClick={checkGuess}
        disabled={gameOver}
      >
        Submit Guess
      </button>
    </div>
  );
}
