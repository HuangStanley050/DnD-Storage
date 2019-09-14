import * as actionType from "../actions/actionTypes";
const initialState = {
  data: [],
  loading: false,
  uploadSuccess: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPLOAD_RESET:
      //console.log("reset uploadSuccess");
      return {
        ...state,
        uploadSuccess: false
      };
    case actionType.UPLOAD_START:
      return {
        ...state,
        loading: true
      };
    case actionType.UPLOAD_OKAY:
      return {
        ...state,
        loading: false,
        uploadSuccess: true
      };
    case actionType.UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        uploadSuccess: false
      };
    default:
      return state;
  }
};

export default reducer;
