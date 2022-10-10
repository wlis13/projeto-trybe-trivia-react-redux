// export const REQUEST_TOKEN = 'REQUEST_TOKEN';
// export const ERROR_TOKEN = 'ERROR_TOKEN';
// export const GET_TOKEN = 'GET_TOKEN';

// export const requestToken = () => ({ type: REQUEST_TOKEN });

// export const errorToken = () => ({ type: ERROR_TOKEN });

export const SAVE_NAME_PLAYER = 'SAVE_NAME_PLAYER';
export const CONVERTED_GRAVATAR_EMAIL = 'CONVERTED_GRAVATAR_EMAIL';

export const saveNamePlayer = (payload) => ({ type: SAVE_NAME_PLAYER, payload });
export const convertedGravatarEmail = (payload) => ({
  type: CONVERTED_GRAVATAR_EMAIL,
  payload,
});
