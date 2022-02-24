import React from "react";

function Paginado({ cardsPerPage, allCharacters, paginado }) {
  const pagNumbers = [];

  for (let i = 0; i < Math.ceil(allCharacters / cardsPerPage); i++) {
    pagNumbers.push(i+1);
  }

  return (
    <div>
  
      <ul className="paginado">
        {pagNumbers &&
          pagNumbers.map((number) => {
            return (
              <li  className='number' key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Paginado;
