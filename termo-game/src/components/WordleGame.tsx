import React, { useState, useEffect } from "react";
import { wordsMock } from "../mock/mock";
export const WordleGame = () => {
  const [word, setWord] = useState<string>("");
  const [guessedWords, setGuessedWords] = useState<string[][]>([[]]);
  const [availableSpace, setAvailableSpace] = useState<number>(1);
  const [guessedWordCount, setGuessedWordCount] = useState<number>(0);

  useEffect(() => {
    createSquares();
    getNewWord();
  }, []);

  const getNewWord = () => {
    const randomIndex = Math.floor(Math.random() * wordsMock.length);
    const randomWord = wordsMock[randomIndex];
    setWord(randomWord);
  };

  const getCurrentWordArr = () => {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  };

  const updateGuessedWords = (letter: string) => {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      setAvailableSpace(availableSpace + 1);
      if (availableSpaceEl) {
        availableSpaceEl.textContent = letter;
      }
    }
  };

  const getTileColor = (letter: string, index: number) => {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  };

  const handleSubmitWord = () => {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Palavra deve ter 5 letras");
      return;
    }

    const currentWord = currentWordArr.join("");
    const isCorrectWord = wordsMock.includes(currentWord);
    if (isCorrectWord) {
      const firstLetterId = guessedWordCount * 5 + 1;
      const interval = 200;
      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
          const tileColor = getTileColor(letter, index);

          const letterId = firstLetterId + index;
          const letterEl = document.getElementById(String(letterId));
          if (letterEl) {
            letterEl.classList.add("animate__flipInX");
            letterEl.style.background = tileColor;
            letterEl.style.borderColor = tileColor;
          }
        }, interval * index);
      });

      setGuessedWordCount(guessedWordCount + 1);

      if (currentWord === word) {
        window.alert("Parabéns!");
      }

      if (guessedWords.length === 6) {
        window.alert(
          `Desculpe, você não tem mais tentativas! A palavra era ${word}.`
        );
      }

      setGuessedWords([...guessedWords, []]);
    } else {
      window.alert("Palavra incorreta!");
    }
  };

  const createSquares = () => {
    const gameBoard = document.getElementById("board");

    if (gameBoard) {
      for (let index = 0; index < 30; index++) {
        const square = document.createElement("div");
        square.classList.add("square", "animate__animated");
        square.setAttribute("id", (index + 1).toString());
        gameBoard.appendChild(square);
      }
    }
  };

  const handleDeleteLetter = () => {
    const currentWordArr = getCurrentWordArr();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    if (lastLetterEl) {
      lastLetterEl.textContent = "";
    }

    setAvailableSpace(availableSpace - 1);
  };

  const handleKeyClick = (letter: string) => {
    if (letter === "enter") {
      handleSubmitWord();
      return;
    }

    if (letter === "del") {
      handleDeleteLetter();
      return;
    }

    updateGuessedWords(letter);
  };

  const renderKeyboard = () => {
    const keyboardRows = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["enter", "z", "x", "c", "v", "b", "n", "m", "del"],
    ];

    return (
      <div id="keyboard-container">
        {keyboardRows.map((row, rowIndex) => (
          <div className="keyboard-row" key={rowIndex}>
            {row.map((key) => (
              <button
                key={key}
                data-key={key}
                onClick={() => handleKeyClick(key)}
                className={`${
                  key === "enter" || key === "del" ? "wide-button" : ""
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div id="container">
      <div id="game">
        <header>
          <h1 className="title">WORDLE</h1>
        </header>
        <div id="board-container">
          <div id="board"></div>
        </div>
        {renderKeyboard()}
      </div>
    </div>
  );
};
