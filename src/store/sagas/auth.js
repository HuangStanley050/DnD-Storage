import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import * as actionType from "../actions/actionTypes";
import { loginFail, loginOkay } from "../actions/authAction";
import API from "../../config/api";

export default function* authSagaWatcher() {
  yield takeEvery(actionType.LOGIN_START, authLoginWorker);
}

function* authLoginWorker(action) {
  const userData = action.userInfo;
  let token;
  try {
    const loginResult = yield axios.post(API.login, userData);
    // console.log(loginResult.data.token);
    token = loginResult.data.token;
    yield localStorage.setItem("File-Uploader", token);
    yield put(loginOkay());
  } catch (err) {
    // console.log(err.response);
    yield put(loginFail(err.response.data.message));
  }
}
