import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCharacters,
  filterCharactersByStatus,
  filterCreated,
  orderByName,
} from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardPerPage] = useState(6);
  const indexLastCard = currentPage * cardsPerPage;
  const indexFisrtCard = indexLastCard - cardsPerPage;
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

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  return (
    <div>
      <Link to="/character">Crear personaje</Link>
      <SearchBar />
      <h1>Componente Home</h1>
      <button onClick={handleClick}>Volver a cargar personajes</button>
      <select onChange={handleSort}>
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
              <Link to={`/characters/${char.id}`}>
                <Card
                  name={char.name}
                  img={
                    char.img
                      ? char.img
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  nickname={char.nickname}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}
