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
export const resetUploadStatus = () => ({ type: actionType.UPLOAD_RESET });
export const noNeedUpdateDashBoard = () => ({
  type: actionType.NO_NEED_UPDATE_DASHBOARD
});
// export const needUpdateDashBoard = () => ({
//   type: actionType.NEED_UPDATE_DASHBOARD
// });
