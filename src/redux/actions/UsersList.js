import { GET_USERS, SET_USERS } from "redux/constants/UsersList";

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function getUsers() {
  return {
    type: GET_USERS,
  };
}
