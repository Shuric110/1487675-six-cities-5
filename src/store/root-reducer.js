import {combineReducers} from "redux";
import {appData} from "./app-data/app-data";
import {appState} from "./app-state/app-state";
import {user} from "./user/user";

const NameSpace = {
  DATA: `DATA`,
  APP: `APP`,
  USER: `USER`,
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.APP]: appState,
  [NameSpace.USER]: user,
});
