import { combineReducers } from "redux";
import Auth from "./Auth";
import Theme from "./Theme";
import Users from "./UsersList";

const reducers = combineReducers({
  theme: Theme,
  auth: Auth,
  users: Users,
});

export default reducers;
