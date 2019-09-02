import * as actionType from "../actions/actionTypes";
const initialState = {
  data: [],
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPLOAD_START:
      return {
        ...state,
        loading: true
      };
    case actionType.UPLOAD_OKAY:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
