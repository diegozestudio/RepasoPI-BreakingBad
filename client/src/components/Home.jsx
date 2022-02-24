import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  filterCharactersByStatus,
  filterCreated,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(6);
  const indexLastCard = currentPage * cardsPerPage; //6 * 1 = 6
  const indexFisrtCard = indexLastCard - cardsPerPage; //6 - 6 = 0
  //    desde 0       a      6
  const currentCards = allCharacters.slice(indexFisrtCard, indexLastCard);

  const paginado = (pagNumber) => {
    setCurrentPage(pagNumber);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCharacters());
  };

  const handleFilterStatus = (e) => {
    dispatch(filterCharactersByStatus(e.target.value));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  return (
    <div>
      <Link to="/character">Crear personaje</Link>
      <h1>Componente Home</h1>
      <button onClick={handleClick}>Volver a cargar personajes</button>
      <select>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <select onChange={handleFilterStatus}>
        <option value="All">Todos</option>
        <option value="Alive">Vivos</option>
        <option value="Deceased">Muertos</option>
        <option value="Unknown">Desconocidos</option>
        <option value="Presumed dead">Probablemente muertos</option>
      </select>
      <select onChange={handleFilterCreated}>
        <option value="All">Todos</option>
        <option value="created">Creados</option>
        <option value="api">Existentes</option>
      </select>
      <Paginado
        cardsPerPage={cardsPerPage}
        allCharacters={allCharacters.length}
        paginado={paginado}
      />
      {allCharacters &&
        currentCards.map((char) => {
          return (
            <div key={char.id}>
              <Link to={`/home/${char.id}`}>
                <Card
                  name={char.name}
                  img={char.img}
                  nickname={char.nickname}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}
