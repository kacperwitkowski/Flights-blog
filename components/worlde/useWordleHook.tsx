import React, { useState } from "react";
import { wordList } from "./Data";

const useWordle = (solution: string) => {
  const [turn, setTurn] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [wrongMessage, setWrongMessage] = useState<any>("");
  const [guesses, setGuesses] = useState<object[]>([...Array(6)]); //all guesses
  const [history, setHistory] = useState<string[]>([]); //all guesses but as a strings
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [usedKeys, setUsedKeys] = useState({}); //{}
  const [resetGame, setResetGame] = useState<boolean>(false);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((lt) => {
      return {
        key: lt,
        color: "grey",
      };
    });

    //find green letters
    formattedGuess.forEach((el, i) => {
      if (solutionArray[i] === el.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = "";
      }
    });

    //find yellow letters
    formattedGuess.forEach((el, i) => {
      if (solutionArray.includes(el.key) && el.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(el.key)] = "";
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess: any) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuess) => {
      let newGuesses = [...prevGuess];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevValue) => {
      return prevValue + 1;
    });

    setUsedKeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((el: any) => {
        const currColor = newKeys[el.key];

        if (el.color === "green") {
          newKeys[el.key] = "green";
          return;
        }
        if (el.color === "yellow" && currColor !== "green") {
          newKeys[el.key] = "yellow";
          return;
        }
        if (
          el.color === "grey" &&
          currColor !== "yellow" &&
          currColor !== "green"
        ) {
          newKeys[el.key] = "grey";
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess("");
  };

  const handleMessage = (message: string) => {
    setWrongMessage(message);
    setTimeout(() => {
      setWrongMessage("");
    }, 3000);
  };

  const handleKeyup = ({ key }: any) => {
    if (key === "Enter") {
      //1 only add guess if turn is less than 5
      if (turn > 5) {
        handleMessage("You used all your guesses!");
        return;
      }
      //2 do not allow duplicate words
      if (history.includes(currentGuess)) {
        handleMessage("You already tried that word!");
        return;
      }
      //3 check if is 5 chars long
      if (currentGuess.length !== 5) {
        handleMessage("Not enough letters!");
        return;
      }

      if (!wordList[currentGuess.charAt(0)].includes(currentGuess)) {
        handleMessage("Not in word list!");
        return;
      }

      const format = formatGuess();
      addNewGuess(format);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  const resetGameFn = () => {
    setGuesses([...Array(6)]);
    setHistory([]);
    setTurn(0);
    setIsCorrect(false);
    setCurrentGuess("");
    setResetGame(true);
  };

  return {
    turn,
    currentGuess,
    guesses,
    handleMessage,
    wrongMessage,
    isCorrect,
    usedKeys,
    resetGame,
    resetGameFn,
    setResetGame,
    handleKeyup,
  };
};

export default useWordle;
