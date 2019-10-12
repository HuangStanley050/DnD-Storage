import * as actionType from "./actionTypes";

export const get_data_start = () => ({ type: actionType.GET_DATA_START });
export const get_data_okay = data => ({ type: actionType.GET_DATA_OKAY, data });
export const get_data_fail = err => ({ type: actionType.GET_DATA_FAIL, err });

export const get_download_data = fileID => ({
  type: actionType.REQUEST_DOWNLOAD,
  fileID
});

export const delete_file = fileID => ({
  type: actionType.DELETE_START,
  fileID
});

export const delete_file_okay = fileID => ({
  type: actionType.DELETE_OKAY,
  fileID
});
export const deleteF_file_fail = () => ({ type: actionType.DELETE_FAIL });
