import React from "react";

interface Props {
  postsPerPage: number;
  totalPosts: number;
  currentPage: number;
  paginate: (arg: number) => void;
}

const Pagination: React.FC<Props> = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  const pageNum = pageNumber.map((number) => {
    return (
      <div className="p-2" key={number}>
        <a
          className="cursor-pointer text-2xl"
          style={number === currentPage ? { color: "red" } : { color: "black" }}
          onClick={() => paginate(number)}
        >
          {number}
        </a>
      </div>
    );
  });

  return (
    <div className="flex p-3 justify-center max-w-sm mx-auto">{pageNum}</div>
  );
};

export default Pagination;
