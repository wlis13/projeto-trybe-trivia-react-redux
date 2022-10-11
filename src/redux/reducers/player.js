import { SAVE_NAME_PLAYER,
  CONVERTED_GRAVATAR_EMAIL,
  RESPONSE_SUCCES,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  result: [],
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
  case RESPONSE_SUCCES:
    return {
      ...state,
      result: action.payload.results,
      response_code: action.payload.response_code,
    };
  default:
    return state;
  }
};

export default player;
