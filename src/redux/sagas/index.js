import { all } from "redux-saga/effects";
import Auth from "./Auth";
import UsersList from "./UsersList";

export default function* rootSaga(getState) {
  yield all([Auth(), UsersList()]);
}
