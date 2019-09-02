import * as actionType from "../actions/actionTypes";
import { takeEvery, put, select } from "redux-saga/effects";

export default function* dataSagaWatcher() {
  yield takeEvery(actionType.UPLOAD_START, dataUploadWorker);
}

function* dataUploadWorker(action) {
  yield console.log("This is from upload saga worker");
  yield console.log(action);
}
