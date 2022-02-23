import axios from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { setUsers } from "redux/actions";
import { GET_USERS } from "redux/constants/UsersList";

const getData = () => axios.get("https://jsonplaceholder.typicode.com/users");

export function* setFetchedUsers() {
  const { data } = yield call(getData);
  yield put(setUsers(data));
}

export function* getUsers() {
  yield takeEvery(GET_USERS, setFetchedUsers);
}

export default function* rootSaga() {
  yield all([fork(getUsers)]);
}
