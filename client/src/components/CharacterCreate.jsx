import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOcupations, postCharacter } from "../redux/actions";

function CharacterCreate() {
  const dispatch = useDispatch();
  const occupations = useSelector((state) => state.occupations);
  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    img: "",
    occupation: [],
  });

  useEffect(() => {
    dispatch(getOcupations());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>{" "}
      </Link>
      <h1>Crea tu personaje</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" value={input.name} name="name" />
        </div>
        <div>
          <label>Nickname</label>
          <input type="text" value={input.nickname} name="nickname" />
        </div>
        <div>
          <label>Birthday</label>
          <input type="date" value={input.birthday} name="birthday" />
        </div>
        <div>
          <label>Status</label>
          <label>
            Alive
            <input type="checkbox" value="Alive" name="Alive" />
          </label>
          <label>
            Muerto <input type="checkbox" value="Deceased" name="Deceased" />
          </label>
          <label>
            Desconocido <input type="checkbox" value="Unknow" name="Unknow" />
          </label>
        </div>
        <div>
          <label>Occupation</label>
          <input type="text" value={input.occupation} name="occupation" />
        </div>
        <div>
          <label>Imagen</label>
          <input type="text" value={input.img} name="img" />
        </div>
        <select>
          {occupations.map((occupation) => {
            return <option value={occupation.name}>{occupation.name} </option>;
          })}
        </select>
        <hr />
        <button type="submit">Crear Personaje</button>
      </form>
    </div>
  );
}

export default CharacterCreate;
