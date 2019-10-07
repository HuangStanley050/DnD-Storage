import * as actionType from "../actions/actionTypes";
const initialState = {
  isAuth: true,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGOUT:
      localStorage.removeItem("File-Uploader");
      return {
        ...state,
        isAuth: false
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
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
