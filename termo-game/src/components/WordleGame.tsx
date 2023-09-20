import React, { useEffect, useState } from "react";

const WordleGame = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const maxLetters = 5;
  const numRows = 5;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const { key } = e;
      if (key.match(/[a-zA-Z]/) && letters.length < maxLetters) {
        setLetters((prevLetters) => [...prevLetters, key]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [letters]);
  return (
    <>
      <div className="App">
        <div className="w-[50%] allign">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: maxLetters * numRows }).map((_, index) => (
              <div
                key={index}
                className="w-28 h-28 mb-2 bg-blue-500 text-white text-2xl flex items-center justify-center rounded"
              >
                {letters[index]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordleGame;
