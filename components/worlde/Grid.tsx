import React from "react";
import Row from "./Row";

interface Props {
  currentGuess: string;
  guesses: object[];
  turn: number;
}

const Grid: React.FC<Props> = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((el: any, i: number) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} />;
        }
        return <Row key={i} guess={el} />;
      })}
    </div>
  );
};

export default Grid;
