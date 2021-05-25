import { POST } from "../adapters/http.adapter";
import { displayError, displaySuccess } from "./toaster";
import { SET_USER_PENDING, SET_USER_SUCCESS,GET_USER } from "./types";

export const setUser = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: SET_USER_PENDING });
    try {
      const { user, token } = await POST("/auth/login", credentials);
      localStorage.setItem("i_hash", token);

      dispatch({ type: SET_USER_SUCCESS, payload: user });
    } catch (error) {
      console.log(error)
      displayError(`Error ${error.response? error.response.data: ''}`)
    }
  };
};


