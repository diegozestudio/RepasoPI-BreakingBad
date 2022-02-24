import axios from "axios";
export const GET_CHARACTERS = "GET_CHARACTERS";

export function getCharacters() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/characters");
    return dispatch({ type: GET_CHARACTERS, payload: json.data });
  };
}
