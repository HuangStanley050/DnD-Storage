import * as actionType from "../actions/actionTypes";
import API from "../../config/api";
import axios from "axios";
import { upload_fail, upload_okay } from "../actions/uploadActions";
import { takeEvery, put, select } from "redux-saga/effects";

export default function* dataSagaWatcher() {
  yield takeEvery(actionType.UPLOAD_START, dataUploadWorker);
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
