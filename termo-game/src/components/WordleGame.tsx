import React, { useState, useEffect, useMemo } from "react";

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const boardComponent = useMemo(() => {
    return (
      <div className="w-[540px] mx-auto my-5">
        {Array.from({ length: maxRow }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex justify-center  gap-4 mb-4">
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
    );
  }, [board]);

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

  return <div className="App">{boardComponent}</div>;
};

export default WordleGame;
