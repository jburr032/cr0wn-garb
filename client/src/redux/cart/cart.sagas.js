import { takeLatest, put, all, call } from "redux-saga/effects";
import { clearCartOnSignOut } from "./cart.actions";
import UserActionTypes from "../user/user.types";

export function* clearCart() {
  yield put(clearCartOnSignOut());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCart);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
