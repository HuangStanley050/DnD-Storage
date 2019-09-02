import * as actionType from "./actionTypes";

export const upload_start = files => ({ type: actionType.UPLOAD_START, files });
export const upload_fail = errorMsg => ({
  type: actionType.UPLOAD_FAIL,
  errorMsg
});
export const upload_okay = response => ({
  type: actionType.UPLOAD_OKAY,
  response
});
