import * as actionType from "../actions/actionTypes";
const initialState = {
  data: [],
  loading: false,
  uploadSuccess: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DELETE_OKAY:
      let newData = [];
      newData = state.data.map(fileType => {
        return fileType.files.filter(file => file.id !== action.fileID);
      });
      console.log("new data is: ", newData);
      return {
        ...state,
        data: [...newData],
        loading: false
      };
    case actionType.LOGOUT:
      return {
        ...state,
        data: []
      };
    case actionType.UPLOAD_RESET:
      return {
        ...state,
        uploadSuccess: false
      };
    case actionType.GET_DATA_START:
    case actionType.DELETE_START:
    case actionType.UPLOAD_START:
      return {
        ...state,
        loading: true
      };
    case actionType.GET_DATA_OKAY:
      return {
        ...state,
        loading: false,
        data: [...action.data]
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
