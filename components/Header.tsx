import React, { useState } from "react";
import Link from "next/link";

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="flex justify-between items-center p-5 max-w-7xl mx-auto relative">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-48 md:w-80 object-contain cursor-pointer"
            src="https://i.imgur.com/QPRVzoP.jpg"
            alt="logo"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5"></div>
      </div>

      <div className="hidden md:inline-flex items-center space-x-5 ">
        <Link href="/ideas">
          <h3 className="text-xl underline underline-offset-8 px-4 py-1 rounded-full cursor-pointer">
            Ideas
          </h3>
        </Link>

        <Link href="/worlde">
          <h3 className="text-xl underline underline-offset-8 px-4 py-1 rounded-full cursor-pointer">
            Worlde
          </h3>
        </Link>

        <Link href="/contact">
          <h3 className="text-xl underline underline-offset-8 px-4 py-1 rounded-full cursor-pointer">
            Contact
          </h3>
        </Link>
      </div>
      {showMenu && (
          <div className="absolute bottom-0 left-0 right-0 top-full z-20 bg-white w-full h-max flex flex-col items-center md:hidden">
            <Link href="/ideas">
              <h3 className="text-xl underline underline-offset-8 px-4 py-10 rounded-full cursor-pointer">
                Ideas
              </h3>
            </Link> 

            <Link href="/worlde">
              <h3 className="text-xl underline underline-offset-8 px-4 py-10 rounded-full cursor-pointer">
                Worlde
              </h3>
            </Link>

            <Link href="/contact">
              <h3 className="text-xl underline underline-offset-8 px-4 py-10 rounded-full cursor-pointer">
                Contact
              </h3>
            </Link>
          </div>
      )}
      <div className="md:hidden">
        <button onClick={() => setShowMenu(!showMenu)}>
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
