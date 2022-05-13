import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#fec144] p-3 flex-col sm:flex-row flex items-center text-center">
      <div className="w-full">
        <p>
          @All Rights Reserved by{" "}
          <a
            className="underline underline-offset-4 text-red-800"
            href="https://www.linkedin.com/in/kacper-witkowski-899279234/"
          >
            Kacper Witkowski
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
