import axios from "axios";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const FILTER_BY_STATUS = "FILTER_BY_STATUS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

export function getCharacters() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/characters");
    return dispatch({ type: GET_CHARACTERS, payload: json.data });
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
