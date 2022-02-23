import { DELETE_USER, SET_USERS } from "redux/constants/UsersList";

const initUser = {
  list: [],
  isLoading: true,
};

const user = (state = initUser, action) => {
  switch (action.type) {
    case SET_USERS:
      [...action.users].forEach((item, index) => {
        item.img = `/img/avatars/thumb-${index + 1}.jpg`;
      });
      return { ...state, list: action.users, isLoading: false };
    case DELETE_USER:
      const modifiedList = [...state.list].filter(
        (item) => item.id !== action.id
      );
      return { ...state, list: modifiedList };
    default:
      return state;
  }
};

export default user;
