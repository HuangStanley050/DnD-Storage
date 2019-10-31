import * as actionType from "./actionTypes";

export const getDataStart = () => ({ type: actionType.GET_DATA_START });
export const getDataOkay = data => ({ type: actionType.GET_DATA_OKAY, data });
export const getDataFail = err => ({ type: actionType.GET_DATA_FAIL, err });

export const getDownloadData = fileID => ({
  type: actionType.REQUEST_DOWNLOAD,
  fileID
});

export const deleteFile = fileID => ({
  type: actionType.DELETE_START,
  fileID
});

export const deleteFileOkay = fileID => ({
  type: actionType.DELETE_OKAY,
  fileID
});
export const deleteFileFail = () => ({ type: actionType.DELETE_FAIL });
