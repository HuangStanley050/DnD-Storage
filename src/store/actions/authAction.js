import * as actionType from "./actionTypes";

export const login_start = userInfo => ({
  type: actionType.LOGIN_START,
  userInfo
});
export const login_fail = err => ({ type: actionType.LOGIN_FAIL, err });
export const login_okay = () => ({
  type: actionType.LOGIN_OKAY
});
export const logout = () => ({ type: actionType.LOGOUT });
