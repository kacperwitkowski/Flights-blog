import React, { useEffect } from "react";
import { keys } from "./Keys";

const Keyboard = ({ boardData, handleKeyPress }) => {
  const handleKeyboard = (key) => {
    if (key.key === "Enter") handleKeyPress("ENTER");
    if (key.key === "Backspace") handleKeyPress("⌫");
    if (key.key.length === 1 && key.key.toLowerCase() !== key.key.toUpperCase())
      handleKeyPress(key.key.toUpperCase());
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);
    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col gap-2 items-center mt-20 sm:mt-4 mb-14">
      {keys.map((item, index) => (
        <div className="w-auto flex gap-[5px]" key={index}>
          {item.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`rounded-md font-bold cursor-pointer bg-[#d3d6da] py-[22px] px-[8px] sm:px-[18px] border-none uppercase ${
                boardData && boardData.correctCharArray.includes(key)
                  ? "correct"
                  : boardData && boardData.presentCharArray.includes(key)
                  ? "present"
                  : boardData && boardData.absentCharArray.includes(key)
                  ? "absent"
                  : ""
              } `}
              onClick={() => {
                handleKeyPress(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
