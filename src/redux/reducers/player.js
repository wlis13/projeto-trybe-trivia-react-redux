import { SAVE_NAME_PLAYER,
  CONVERTED_GRAVATAR_EMAIL,
  SAVE_SCORE,
  FALSE_RESPONSE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_NAME_PLAYER:
    return {
      ...state,
      name: action.payload,
    };
  case CONVERTED_GRAVATAR_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case FALSE_RESPONSE:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default player;
