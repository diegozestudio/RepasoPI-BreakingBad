import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getOcupations, postCharacter } from "../redux/actions";

const validate = (input) => {
  let errors = {};

  !input.name && (errors.name = "Se necesita un nombre");
  !input.nickname && (errors.nickname = "Se necesita un nickname");

  return errors;
};

function CharacterCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const occupations = useSelector((state) => state.occupations);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    nickname: "",
    birthday: "",
    status: "",
    img: "",
    occupation: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        status: e.target.value,
      });
    }
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      occupation: input.occupation.filter((c) => c !== e.target.name),
    });
  };

  const handleSelect = (e) => {
    setInput({
      ...input,
      occupation: [...input.occupation, e.target.value],
    });
  };

  useEffect(() => {
    dispatch(getOcupations());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCharacter(input));
    alert("Personaje creado padre");
    setInput({
      name: "",
      nickname: "",
      birthday: "",
      status: "",
      img: "",
      occupation: [],
    });
    history.push("/home");
  };

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu personaje</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name} </span>}
        </div>
        <div>
          <label>Nickname</label>
          <input
            type="text"
            value={input.nickname}
            name="nickname"
            onChange={handleChange}
          />
          {errors.nickname && <span>{errors.nickname} </span>}
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="text"
            value={input.img}
            name="img"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birthday</label>
          <input
            type="date"
            value={input.birthday}
            name="birthday"
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{ fontWeight: "bold" }}>Status: </label>
          <label>
            Alive
            <input
              type="checkbox"
              value="Alive"
              name="Alive"
              onChange={handleCheck}
            />
          </label>
          <label>
            Muerto
            <input
              type="checkbox"
              value="Deceased"
              name="Deceased"
              onChange={handleCheck}
            />
          </label>
          <label>
            Desconocido
            <input
              type="checkbox"
              value="Unknown"
              name="Unknown"
              onChange={handleCheck}
            />
          </label>
          <label>
            Presuntamente muerto
            <input
              type="checkbox"
              value="Presumed dead"
              name="Presumed dead"
              onChange={handleCheck}
            />
          </label>
        </div>
        <label style={{ fontWeight: "bold" }}>Occupations: </label>
        <select onChange={handleSelect}>
          {occupations.map((occupation) => {
            return <option value={occupation.name}>{occupation.name} </option>;
          })}
        </select>
        <hr />

        {errors.name || (errors.nickname && !input.name) || !input.nickname ? (
          <button type="submit" disabled={true}>
            Crear Personaje
          </button>
        ) : (
          <button type="submit">Crear Personaje</button>
        )}
      </form>

      {input.occupation.map((oc) => (
        <div>
          <p>{oc}</p>
          <button name={oc} onClick={handleDelete}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default CharacterCreate;
