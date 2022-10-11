import { SAVE_TIMER } from '../actions';

const INITIAL_STATE = {
  counterTimer: 0,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TIMER:
    return {
      ...state,
      counterTimer: action.payload,
    };
  default:
    return state;
  }
};

export default timer;
