import * as actionType from "./actionTypes";

export const loginStart = userInfo => ({
  type: actionType.LOGIN_START,
  userInfo
});
export const loginFail = err => ({ type: actionType.LOGIN_FAIL, err });
export const loginOkay = () => ({
  type: actionType.LOGIN_OKAY
});
export const logout = () => ({ type: actionType.LOGOUT });
