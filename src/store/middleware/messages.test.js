import {ActionType} from "../action";
import {messages} from "./messages";

jest.useFakeTimers();

describe(`Messages middleware works correctly`, () => {
  it(`Middleware called for a random action type should not modify action`, () => {
    const dispatch = jest.fn();
    const next = jest.fn(() => `fake next`);
    const middleware = messages({dispatch})(next);

    const result = middleware({
      type: `FAKE_ACTION`,
      payload: `fake payload`
    });

    expect(result).toEqual(`fake next`);
    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenNthCalledWith(1, {
      type: `FAKE_ACTION`,
      payload: `fake payload`
    });
  });

  it(`Middleware called for a show message action adds initial data with different ids to the action and sets message hide timers`, () => {
    const dispatch = jest.fn();
    const next = jest.fn(() => `fake next`);
    const middleware = messages({dispatch})(next);

    const result = middleware({
      type: ActionType.SHOW_MESSAGE,
      payload: {
        text: `test message`
      }
    });

    expect(result).toEqual(`fake next`);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenNthCalledWith(1, {
      type: ActionType.SHOW_MESSAGE,
      payload: {
        id: expect.any(Number),
        text: `test message`,
        isFadingOut: false,
      }
    });

    const id1 = next.mock.calls[0][0].payload.id;

    middleware({
      type: ActionType.SHOW_MESSAGE,
      payload: {
        text: `test message 2`
      }
    });

    const id2 = next.mock.calls[1][0].payload.id;

    expect(id2).not.toEqual(id1);
  });

});
