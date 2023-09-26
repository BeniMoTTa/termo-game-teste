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
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => response.json())
      .then((data) => setAnswer(data[0]));
  }, []);

  const handleKeyPress = (event: { key: string }) => {
    const key = event.key.toUpperCase();
    if (/[QWERTYUIOPASDFGHJKLZXCVBNM]/.test(key)) {
      if (currentCol < maxCol) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[currentRow][currentCol] = key;
          setCurrentCol((prevCol) => prevCol + 1);
          return newBoard;
        });
      }
    }
  };

  useEffect(() => {
    if (currentCol === maxCol) {
      if (board[currentRow].join("") === answer) {
        alert("You win!");
      } else {
        alert("You lose!");
      }
      setBoard((prevBoard) => prevBoard.map((row) => row.map(() => "")));
      setCurrentRow((prevRow) => prevRow + 1);
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
      <div></div>
    </div>
  );
};

export default WordleGame;
