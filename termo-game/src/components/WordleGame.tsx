import React, { useEffect, useState } from "react";

const WordleGame = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const maxLetters = 5;
  const numRows = 5;

  const isAllowedLetter = (key: string) =>
    /[QWERTYUIOPASDFGHJKLZXCVBNM]/.test(key);

  const forbiddenChars = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Backspace",
    "Enter",
    "Tab",
    "Control",
    "Shift",
    "CapsLock",
    "Quote",
    "Alt",
    "ContextMenu",
  ];
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (
        isAllowedLetter(key) &&
        !forbiddenChars.includes(key) &&
        letters.length < maxLetters * numRows
      ) {
        e.preventDefault();
        setLetters((prevLetters) => [...prevLetters, key]);
      }
    };

    window.addEventListener("keyup", handleKeyPress);

    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [letters, forbiddenChars]);
  return (
    <>
      <div className="App">
        <div className="w-[540px] allign">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: maxLetters * numRows }).map((_, index) => (
              <div
                key={index}
                className="w-24 h-24 mb-2 bg-blue-500 text-white text-[38px] flex items-center justify-center rounded"
              >
                {letters[index]}
              </div>
            ))}
          </div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default WordleGame;
