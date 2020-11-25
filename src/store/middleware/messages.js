import {ActionType} from "../action";
import {extend} from "../../util";
import {MESSAGE_SHOW_TIME, MESSAGE_FADEOUT_TIME} from "../../const";
import {ActionCreator} from "../action";

const idSequence = {
  _currentId: 1,

  getNextId() {
    return this._currentId++;
  }
};

export const messages = ({dispatch}) => (next) => (action) => {
  if (action.type === ActionType.SHOW_MESSAGE) {
    const id = idSequence.getNextId();
    action = extend(action, {payload: extend(action.payload, {
      id,
      isFadingOut: false,
    })});

    setTimeout(() => {
      dispatch(ActionCreator.fadeoutMessage(id));
    }, MESSAGE_SHOW_TIME);

    setTimeout(() => {
      dispatch(ActionCreator.removeMessage(id));
    }, MESSAGE_SHOW_TIME + MESSAGE_FADEOUT_TIME);
  }

  return next(action);
};
