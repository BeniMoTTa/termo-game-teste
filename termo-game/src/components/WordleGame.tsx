import React, { useState } from "react";

const WORD_TO_GUESS = "HELLO";

function WordleGame() {
  const [guess, setGuess] = useState(["", "", "", "", ""]);
  const [feedback, setFeedback] = useState(["", "", "", "", ""]);
  const [attempts, setAttempts] = useState(0);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.toUpperCase();
    const newGuess = [...guess];
    newGuess[index] = value;
    setGuess(newGuess);
  };

  const checkGuess = () => {
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
    }
  };

  return (
    <div className="text-center mt-8">
      <div className="flex justify-center">
        {feedback.map((f, index) => (
          <div
            key={index}
            className={`w-12 h-12 p-3 rounded-full border border-black m-2 ${
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
            className="w-12 h-12 p-2 text-3xl rounded-lg border border-black mx-2"
            value={g}
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={checkGuess}
      >
        Submit Guess
      </button>
    </div>
  );
}

export default WordleGame;
