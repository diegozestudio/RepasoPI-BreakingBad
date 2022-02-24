import { useState } from "react";
import { getNameCharacters } from "../redux/actions";
import { useDispatch } from "react-redux";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getNameCharacters(name));
    setName('')
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Buscar..." value={name} onChange={handleChange} />
      <button type="submit" >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
