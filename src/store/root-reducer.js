import {combineReducers} from "redux";
import {appData} from "./app-data/app-data";
import {appState} from "./app-state/app-state";

const NameSpace = {
  DATA: `DATA`,
  APP: `APP`,
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.APP]: appState,
});
