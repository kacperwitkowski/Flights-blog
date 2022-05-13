import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { wordList } from "../components/worlde/Data";
import Keyboard from "../components/worlde/Keyboard";
import Head from "next/head";

const Worlde = () => {
  const [boardData, setBoardData] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [charArray, setCharArray] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const resetBoard = () => {
    let alphabetIndex = Math.floor(Math.random() * 26);
    let wordIndex = Math.floor(
      Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)]?.length
    );
    let newBoardData = {
      ...boardData,
      solution: wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
      rowIndex: 0,
      boardWords: [],
      boardRowStatus: [],
      presentCharArray: [],
      absentCharArray: [],
      correctCharArray: [],
      status: "IN_PROGRESS",
    };
    setBoardData(newBoardData);
    localStorage.setItem("board-data", JSON.stringify(newBoardData));
  };

  useEffect(() => {
    setBoardData(JSON.parse(localStorage.getItem("board-data")));

    if (!boardData || !boardData.solution) {
      let alphabetIndex = Math.floor(Math.random() * 26);
      let wordIndex = Math.floor(
        Math.random() * wordList[String.fromCharCode(97 + alphabetIndex)].length
      );
      let newBoardData = {
        ...boardData,
        solution: wordList[String.fromCharCode(97 + alphabetIndex)][wordIndex],
        rowIndex: 0,
        boardWords: [],
        boardRowStatus: [],
        presentCharArray: [],
        absentCharArray: [],
        correctCharArray: [],
        status: "IN_PROGRESS",
      };
      setBoardData(newBoardData);
      localStorage.setItem("board-data", JSON.stringify(newBoardData));
    }
  }, []);

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const enterBoardWord = (word) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = boardData.solution;
    let presentCharArray = boardData.presentCharArray;
    let absentCharArray = boardData.absentCharArray;
    let correctCharArray = boardData.correctCharArray;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;

    for (let index = 0; index < word.length; index++) {
      if (solution.charAt(index) === word.charAt(index)) {
        matchCount++;
        rowStatus.push("correct");
        if (!correctCharArray.includes(word.charAt(index)))
          correctCharArray.push(word.charAt(index));
        if (presentCharArray.indexOf(word.charAt(index)) !== -1)
          presentCharArray.splice(
            presentCharArray.indexOf(word.charAt(index)),
            1
          );
      } else if (solution.includes(word.charAt(index))) {
        rowStatus.push("present");
        if (
          !correctCharArray.includes(word.charAt(index)) &&
          !presentCharArray.includes(word.charAt(index))
        )
          presentCharArray.push(word.charAt(index));
      } else {
        rowStatus.push("absent");
        if (!absentCharArray.includes(word.charAt(index)))
          absentCharArray.push(word.charAt(index));
      }
    }
    if (matchCount === 5) {
      status = "WIN";
      handleMessage("YOU WON");
    } else if (rowIndex + 1 === 6) {
      status = "LOST";
      handleMessage(boardData.solution);
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    let newBoardData = {
      ...boardData,
      boardWords: boardWords,
      boardRowStatus: boardRowStatus,
      rowIndex: rowIndex + 1,
      status: status,
      presentCharArray: presentCharArray,
      absentCharArray: absentCharArray,
      correctCharArray: correctCharArray,
    };
    setBoardData(newBoardData);
    localStorage.setItem("board-data", JSON.stringify(newBoardData));
  };

  const enterCurrentText = (word) => {
    let boardWords = boardData.boardWords;
    let rowIndex = boardData.rowIndex;
    boardWords[rowIndex] = word;
    let newBoardData = { ...boardData, boardWords: boardWords };
    setBoardData(newBoardData);
  };

  const handleKeyPress = (key) => {
    if (boardData.rowIndex > 5 || boardData.status === "WIN") return;
    if (key === "ENTER") {
      if (charArray.length === 5) {
        let word = charArray.join("").toLowerCase();
        if (!wordList[word.charAt(0)].includes(word)) {
          handleError();
          handleMessage("Not in word list");
          return;
        }
        enterBoardWord(word);
        setCharArray([]);
      } else {
        handleMessage("Not enough letters");
      }
      return;
    }
    if (key === "⌫") {
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    } else if (charArray.length < 5) {
      charArray.push(key);
      setCharArray([...charArray]);
    }
    enterCurrentText(charArray.join("").toLowerCase());
  };

  return (
    <>
      <Head>
        <title>Flights Blog | Wordle</title>
        <meta name="description" content="Flighs blog wordle game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex relative flex-col justify-between h-full items-center">
        <div className="flex py-3 px-5 items-center">
          <button
            className="pr-[20px]"
            onClick={() => {
              setShowInfo(true);
            }}
            title="How to play"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <p className="text-xl">WORLDE</p>
          <button
            className="reset-board"
            onClick={resetBoard}
            title="Play Again"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {message && <div className="message">{message}</div>}
        <div className="flex flex-col gap-[5px]">
          {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
            <div
              className={`cube-row ${
                boardData && row === boardData.rowIndex && error && "error"
              }`}
              key={rowIndex}
            >
              {[0, 1, 2, 3, 4].map((column, letterIndex) => (
                <div
                  key={letterIndex}
                  className={`letter ${
                    boardData && boardData.boardRowStatus[row]
                      ? boardData.boardRowStatus[row][column]
                      : ""
                  }`}
                >
                  {boardData &&
                    boardData.boardWords[row] &&
                    boardData.boardWords[row][column]}
                </div>
              ))}
            </div>
          ))}
        </div>
        {showInfo && (
          <div className="z-10 bg-white w-full h-full mx-auto absolute flex flex-col">
            <div className="w-[90%] md:w-1/2 mx-auto relative">
              <button
                className="right-3 absolute"
                onClick={() => setShowInfo(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <div className="text-center w-full md:w-[90%] flex flex-col items-center">
                <h3 className="uppercase font-bold">How To Play</h3>
                <p className="mb-5">
                  Guess the WORDLE in six tries. Each guess must be a valid
                  five-letter word. Hit the enter button to submit. After each
                  guess, the color of the tiles will change to show how close
                  your guess was to the word. In this version of the game only
                  words related to travel will be accepted e.g cities,
                  countries, languages, currencies, rivers and more!
                </p>
                <hr className="w-1/2" />
              </div>
              <div className="w-full md:w-[90%]">
                <h4 className="uppercase">Examples</h4>
                <div className="flex flex-col items-center p-5">
                  <div className="flex items-center font-bold mb-3">
                    <p className="border flex items-center justify-center  w-10 h-10 correct">
                      E
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      G
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      Y
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      P
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      T
                    </p>
                  </div>
                  <p className="text-center">
                    The letter E is in the word and in the correct spot.
                  </p>
                </div>
                <div className="flex flex-col items-center p-5">
                  <div className="flex items-center font-bold mb-3">
                    <p className="border flex items-center justify-center  w-10 h-10">
                      N
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10 present">
                      I
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      M
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      E
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      S
                    </p>
                  </div>
                  <p className="text-center">
                    The letter I is in the word but in the wrong spot.
                  </p>
                </div>
                <div className="flex flex-col items-center p-5">
                  <div className="flex items-center font-bold mb-3">
                    <p className="border flex items-center justify-center w-10 h-10">
                      P
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      A
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      D
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10 absent">
                      U
                    </p>
                    <p className="border flex items-center justify-center ml-2 w-10 h-10">
                      A
                    </p>
                  </div>
                  <p className="text-center">
                    The letter U is not in the word in any spot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <Keyboard boardData={boardData} handleKeyPress={handleKeyPress} />
      </div>
      <Footer />
    </>
  );
};

export default Worlde;
