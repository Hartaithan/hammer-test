import { SET_USERS } from "redux/constants/UsersList";

const initUser = {
  list: [],
  isLoading: true,
};

const user = (state = initUser, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, list: action.users, isLoading: false };
    default:
      return state;
  }
};

export default user;
