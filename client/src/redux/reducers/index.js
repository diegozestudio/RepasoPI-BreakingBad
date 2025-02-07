import {
  GET_CHARACTERS,
  FILTER_BY_STATUS,
  FILTER_CREATED,
  ORDER_BY_NAME,
  GET_NAME_CH,
  POST_CH,
  GET_OCUPATIONS,
  GET_DETAIL,
} from "../actions";

const initialState = {
  characters: [],
  detail: [],
  allCharacters: [],
  occupations: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      };
    case GET_NAME_CH:
      return {
        ...state,
        characters: action.payload,
      };
    case POST_CH:
      return {
        ...state,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_OCUPATIONS:
      return {
        ...state,
        occupations: action.payload,
      };

    case FILTER_BY_STATUS:
      const allCharacters = state.allCharacters;
      const statusFiltered =
        action.payload === "All"
          ? allCharacters
          : allCharacters.filter((char) => char.status === action.payload);
      return {
        ...state,
        characters: statusFiltered,
      };
    case FILTER_CREATED:
      const createdFilter =
        action.payload === "created"
          ? state.allCharacters.filter((char) => char.createdInDb)
          : state.allCharacters.filter((char) => !char.createdInDb);
      return {
        ...state,
        characters:
          action.payload === "All" ? state.allCharacters : createdFilter,
      };
    case ORDER_BY_NAME:
      const arrOrdered =
        action.payload === "asc"
          ? state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.characters.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        characters: arrOrdered,
      };
    default:
      return state;
  }
}

export default rootReducer;
