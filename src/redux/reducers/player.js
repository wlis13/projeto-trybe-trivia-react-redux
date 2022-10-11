import { SAVE_NAME_PLAYER,
  CONVERTED_GRAVATAR_EMAIL,
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
  default:
    return state;
  }
};

export default player;
