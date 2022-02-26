import React from "react";
import { useSelector } from "react-redux";
function Paginado(props) {
  const pagNumbers = [];
  const allCharacters = useSelector((state) => state.characters);
  const { estados, paginado, prev, next } = props;
  const { currentPage, cardsPerPage, maxPageNumberLimit, minPageNumberLimit } =
    estados;

  for (let i = 0; i < Math.ceil(allCharacters.length / cardsPerPage); i++) {
    pagNumbers.push(i + 1);
  }

  const renderPageNumbers = pagNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          id={number}
          onClick={paginado}
          style={{
            padding: "1rem",
            border: "1px solid #000",
            borderRadius: "15%",
            cursor: "pointer",
          }}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {};

  return (
    <div>
      {/* <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {pagNumbers &&
          pagNumbers.map((number) => {
            return (
              <button
                onClick={() => paginado(number)}
                style={{
                  padding: "1rem",
                  border: "1px solid #000",
                  borderRadius: "15%",
                  cursor: "pointer",
                }}
                key={number}
              >
                {number}
              </button>
            );
          })}
      </ul> */}
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button onClick={prev}>Prev</button>
        {renderPageNumbers}
        <button onClick={next}>Next</button>
      </ul>
    </div>
  );
}

export default Paginado;
