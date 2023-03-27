import React, { useEffect, useState } from "react";
import useWordle from "../components/worlde/useWordleHook";
import Grid from "../components/worlde/Grid";
import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import Keypad from "../components/worlde/Keypad";

const Wordle: React.FC = () => {
  const [solution, setSolution] = useState<string>('');
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    resetGame,
    resetGameFn,
    setResetGame,
    turn,
    usedKeys,
    wrongMessage,
  } = useWordle(solution);

  useEffect(() => {
    fetch("https://wordleapi.cyclic.app/solutions")
      .then((res) => res.json())
      .then((data) => {
        const randomSolution =
          data[Math.floor(Math.random() * data.length)].word;

        setSolution(randomSolution);
      });
    setResetGame(false);
  }, [setSolution, resetGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyup);

    if (isCorrect) {
      window.removeEventListener("keydown", handleKeyup);
    }

    if (turn > 5) {
      window.removeEventListener("keydown", handleKeyup);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyup);
    };
  }, [handleKeyup, isCorrect]);

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
            title="Play Again"
            onClick={resetGameFn}
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
        {turn > 5 && solution}
        {wrongMessage && <div className="message">{wrongMessage}</div>}
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
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keypad usedKeys={usedKeys} resetGame={resetGame} />
      </div>
      <Footer />
    </>
  );
};

export default Wordle;
