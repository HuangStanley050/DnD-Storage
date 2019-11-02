import * as actionType from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  loading: false,
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGOUT:
      localStorage.removeItem("File-Uploader");
      return {
        ...state,
        isAuth: false
      };
    case actionType.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.err
      };
    case actionType.LOGIN_START:
      return {
        ...state,
        loading: true
      };
    case actionType.LOGIN_OKAY:
      return {
        ...state,
        isAuth: true,
        loading: false,
        error: ""
      };
    default:
      return state;
  }
};

export default reducer;
