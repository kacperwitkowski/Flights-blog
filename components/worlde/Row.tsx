import React from "react";

interface Props {
  guess?: object[];
  currentGuess?: string;
}

const Row: React.FC<Props> = ({ guess, currentGuess }) => {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((g: any, i: number) => (
          <div key={i} className={`${g.color} letter`}>
            {g.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    let letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((lt: any, i: number) => (
          <div className="filled letter" key={i}>
            {lt}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, i) => (
          <div key={i}></div>
        ))}
      </div>
    );
  }
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Row;
