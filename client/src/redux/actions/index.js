import axios from "axios";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const FILTER_BY_STATUS = "FILTER_BY_STATUS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_CH = "GET_NAME_CH";
export const GET_OCUPATIONS = "GET_OCUPATIONS";
export const POST_CH = "POST_CH";

export function getCharacters() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/characters");
    return dispatch({ type: GET_CHARACTERS, payload: json.data });
  };
}
export function getOcupations() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/occupations");
    return dispatch({ type: GET_OCUPATIONS, payload: json.data });
  };
}

export function getNameCharacters(payload) {
  return async function (dispatch) {
    try {
      const json = await axios(
        `http://localhost:3001/characters?name=${payload}`
      );
      return dispatch({
        type: GET_NAME_CH,
        payload: json.data,
      });
    } catch (e) {
      alert("Personaje no encontrado");
    }
  };
}

export function postCharacter(payload) {
  return async function (dispatch) {
   
      const json = await axios.post("http://localhost:3001/character", payload);
      return json
  };
}

export function filterCharactersByStatus(payload) {
  return {
    type: FILTER_BY_STATUS,
    payload,
  };
}
export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}
