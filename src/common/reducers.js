import { SET_USER_PENDING, SET_USER_SUCCESS, SET_USER_FAILURE , GET_USER} from "./types";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const setUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PENDING:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case SET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
      break;

    // case SET_USER_FAILURE:
    //     return {
    //         ...state,
    //         isLoading: false,
    //         error: action.payload
    //     }
    // break;
    default:
      return state;
  }
};

