import * as actionType from "../actions/actionTypes";
import API from "../../config/api";
import axios from "axios";
import { upload_fail, upload_okay } from "../actions/uploadActions";
import { get_data_okay, delete_file_okay } from "../actions/getDataAction";
import { takeEvery, put, select } from "redux-saga/effects";

export default function* dataSagaWatcher() {
  yield takeEvery(actionType.UPLOAD_START, dataUploadWorker);
  yield takeEvery(actionType.GET_DATA_START, dataFetchWorker);
  yield takeEvery(actionType.REQUEST_DOWNLOAD, dataDownloadWorker);
  yield takeEvery(actionType.DELETE_START, dataDeleteWorker);
}
function* dataDeleteWorker(action) {
  const token = localStorage.getItem("File-Uploader");
  const fileID = action.fileID;
  let result;
  try {
    result = yield axios({
      headers: { Authorization: "bearer " + token },
      method: "delete",
      url: API.delete,
      data: {
        fileID
      }
    });
    yield put(delete_file_okay());
  } catch (err) {
    console.log(err.response);
  }
}
function* dataDownloadWorker(action) {
  const token = localStorage.getItem("File-Uploader");
  try {
    let result = yield axios({
      headers: { Authorization: "bearer " + token },
      method: "get",
      url: `${API.download}${action.fileID}`
    });
    window.location.assign(result.data.link);
  } catch (err) {
    console.log("error");
    console.log(err);
  }
}

function* dataFetchWorker(action) {
  // yield console.log("fetching data");
  // yield console.log(action);
  let fetchResult;
  const token = localStorage.getItem("File-Uploader");
  try {
    fetchResult = yield axios({
      headers: { Authorization: "bearer " + token },
      method: "get",
      url: API.upload
    });

    yield put(get_data_okay(fetchResult.data.files));
  } catch (err) {
    console.log(err);
  }
}

function* dataUploadWorker(action) {
  // yield console.log("This is from upload saga worker");
  // yield console.log(action.files);
  const formData = new FormData();
  const token = localStorage.getItem("File-Uploader");
  const files = action.files;
  for (let file of files) {
    formData.append("files", file);
  }
  try {
    yield axios({
      headers: { Authorization: "bearer " + token },
      method: "post",
      url: API.upload,
      data: formData
    });
    yield put(upload_okay("Upload Okay!"));
  } catch (err) {
    //console.log(err.response);
    yield put(upload_fail("upload failed"));
  }
}
