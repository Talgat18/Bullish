import { GETTING_NEWS, GOT_NEWS, FAILED_NEWS } from "../actions/types";

import { refreshToken } from "../actions/authActions";

const initialState = {
  loading: false,
  articles: [],
  totalResults: 0,
  randomIndex: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GETTING_NEWS:
      return {
        ...state,
        loading: true
      };
    case GOT_NEWS:
      return {
        ...state,
        randomIndex: Math.round(Math.random() * action.payload.articles.length),
        loading: false,
        articles: action.payload.articles,
        totalResults: action.payload.articles.length
      };
    case FAILED_NEWS:
      refreshToken();
      return {
        ...state,

        loading: false
      };

    default:
      return state;
  }
}
