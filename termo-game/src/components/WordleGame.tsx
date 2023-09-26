import React, { useState, useEffect } from "react";

const WordleGame = () => {
  const [letters, setLetters] = useState([]);
  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [answer, setAnswer] = useState("");
  const maxCol = 5;
  const maxRow = 5;

  useEffect(() => {
    // Get the answer from the server
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => response.json())
      .then((data) => setAnswer(data[0])); // Use data[0] to get the first word from the response
  }, []);

  const handleKeyPress = (event) => {
    // Check if the key is a letter
    if (event.key.match(/[a-z]/i)) {
      // Check if the current column is within bounds
      if (currentCol < maxCol) {
        // Add the letter to the board
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[currentRow][currentCol] = event.key.toUpperCase();
          setCurrentCol((prevCol) => prevCol + 1);
          return newBoard;
        });
      }
    }
  };

  useEffect(() => {
    // Check if the user has entered a full word
    if (currentCol === maxCol) {
      // Check if the word is correct
      if (board[currentRow].join("") === answer) {
        // The user has won!
        alert("You win!");
      } else {
        // The user has lost
        alert("You lose!");
      }

      // Reset the board
      setBoard((prevBoard) => prevBoard.map((row) => row.map(() => "")));

      // Move to the next row
      setCurrentRow((prevRow) => prevRow + 1);

      // Reset the current column
      setCurrentCol(0);
    }
  }, [board, currentRow, currentCol, answer]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentCol, handleKeyPress]);

  return (
    <div className="App">
      <div className="w-[540px] mx-auto my-5">
        {Array.from({ length: maxRow }).map((_, rowIndex) => (
          <div key={rowIndex} className={`grid grid-cols-${maxCol} gap-2`}>
            {Array.from({ length: maxCol }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="w-16 h-16 bg-blue-500 text-white text-[24px] flex items-center justify-center rounded"
              >
                {board[rowIndex][colIndex]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordleGame;
