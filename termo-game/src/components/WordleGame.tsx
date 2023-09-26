import React, { useState, useEffect } from "react";
import { wordsMock } from "../mock/mock";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { apiImage } from "../services/api";
export const WordleGame = () => {
  const [word, setWord] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [guessedWords, setGuessedWords] = useState<string[][]>([[]]);
  const [availableSpace, setAvailableSpace] = useState<number>(1);
  const [guessedWordCount, setGuessedWordCount] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const apiKey = "66iuuxcsVoQmd44vgbbBEQh0JNMuWMk4pR6JN1MJ9kHBWX9h1goLEp6U";
  useEffect(() => {
    const fetchImage = async () => {
      const response = await apiImage.get(
        `${Math.floor(Math.random() * 100) + 1}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      const data = response.data;

      setImageUrl(
        data.photos[Math.floor(Math.random() * data.photos.length)].src.original
      );
    };
    fetchImage();
    const IntervalId = setInterval(fetchImage, 30000);
    return () => clearInterval(IntervalId);
  }, []);
  useEffect(() => {
    createSquares();
    getNewWord();
  }, []);

  const getNewWord = () => {
    setAttempts(0);
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
    if (attempts >= 6) {
      window.alert("Desculpe, você não tem mais tentativas!");
      return;
    }

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
      setAttempts(attempts + 1);
    } else {
      window.alert("Palavra incorreta!");
    }
  };

  const createSquares = () => {
    const gameBoard = document.getElementById("board");

    if (gameBoard) {
      for (let index = 0; index < 15; index++) {
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
    <div id="container" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div id="game">
        <div className="box">
          <svg viewBox="0 0 1320 300" style={{ zIndex: 2 }}>
            <text x="50%" y="50%" dy=".35em" text-anchor="middle">
              termo
            </text>
          </svg>
          <span className="border-animate"></span>
          <div id="board-container">
            <div id="board"></div>
          </div>
          {renderKeyboard()}
        </div>
      </div>
      <button
        className="w-[55px] h-[55px] rounded-full flex justify-center items-center fixed right-[40px] bottom-[80px] text-white bg-gradient-to-tl from-[#007bff] to-[#0056b3] border-[2px] border-white hover:shadow-2xl transform text-[30px] hover:scale-105 transition-transform"
        onClick={() => console.log("qualquer")}
      >
        <div className="flex items-center ">
          <InfoCircledIcon className="w-[65%] h-[80%] mt-[25px] mr-[10px]" />
        </div>
      </button>
    </div>
  );
};
