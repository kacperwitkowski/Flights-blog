import React, { useState } from "react";

const Keypad = ({ usedKeys, resetGame }: any) => {
  const [letters, setLetters] = useState([
    { key: "a" },
    { key: "b" },
    { key: "c" },
    { key: "d" },
    { key: "e" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "i" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "m" },
    { key: "n" },
    { key: "o" },
    { key: "p" },
    { key: "q" },
    { key: "r" },
    { key: "s" },
    { key: "t" },
    { key: "u" },
    { key: "v" },
    { key: "w" },
    { key: "x" },
    { key: "y" },
    { key: "z" },
  ]);

  return (
    <div className="keypad">
      {letters.map((el) => {
        let color = usedKeys[el.key];

        if (resetGame) {
          Object.keys(usedKeys).forEach((key) => {
            usedKeys[key] = "";
          });
          return;
        }

        return (
          <div className={color} key={el.key}>
            {el.key}
          </div>
        );
      })}
    </div>
  );
};

export default Keypad;
