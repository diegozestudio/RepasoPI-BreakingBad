import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharacters } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allCharacters = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getCharacters());
  };
  return (
    <div>
      <Link to="/character">Crear personaje</Link>
      <h1>Componente Home</h1>
      <button onClick={handleClick}>Volver a cargar personajes</button>
      <select>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <select>
        <option value="All">Todos</option>
        <option value="Alive">Vivos</option>
        <option value="Deceased">Muertos</option>
        <option value="Unknow">Desconocidos</option>
        <option value="Presumed dead">Probablemente muertos</option>
      </select>
      <select>
        <option value="All">Todos</option>
        <option value="created">Creados</option>
        <option value="api">Existentes</option>
      </select>
      {allCharacters &&
        allCharacters.map((char) => {
          return (
            <div key={char.id}>
              <Link to={`/home/${char.id}`}>
                <Card
                  name={char.name}
                  image={char.img}
                  nickname={char.nickname}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}
