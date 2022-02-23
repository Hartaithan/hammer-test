import { SET_USER } from "redux/constants/User";

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}
