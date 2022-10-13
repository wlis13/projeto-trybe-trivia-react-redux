export const SAVE_NAME_PLAYER = 'SAVE_NAME_PLAYER';
export const SAVE_TIMER = 'SAVE_TIMER';
export const CONVERTED_GRAVATAR_EMAIL = 'CONVERTED_GRAVATAR_EMAIL';
export const SAVE_SCORE = 'SAVE_SCORE';
export const FALSE_RESPONSE = 'FALSE_RESPONSE';
export const ADD_ASSERTIONS = 'SAVE_ASSERTIONS';
export const RESET_SCORE = 'RESET_SCORE';

export const saveNamePlayer = (payload) => ({ type: SAVE_NAME_PLAYER, payload });
export const convertedGravatarEmail = (payload) => ({
  type: CONVERTED_GRAVATAR_EMAIL,
  payload,
});
export const saveTimer = (payload) => ({
  type: SAVE_TIMER,
  payload,
});

export const addScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});

export const falseResponse = () => ({
  type: FALSE_RESPONSE,
});

export const addAssertions = (payload) => ({
  type: ADD_ASSERTIONS,
  payload,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});
