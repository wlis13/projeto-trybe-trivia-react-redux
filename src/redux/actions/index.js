// export const REQUEST_TOKEN = 'REQUEST_TOKEN';
// export const ERROR_TOKEN = 'ERROR_TOKEN';
// export const GET_TOKEN = 'GET_TOKEN';

// export const requestToken = () => ({ type: REQUEST_TOKEN });

// export const errorToken = () => ({ type: ERROR_TOKEN });

export const SAVE_NAME_PLAYER = 'SAVE_NAME_PLAYER';
export const CONVERTED_GRAVATAR_EMAIL = 'CONVERTED_GRAVATAR_EMAIL';
export const RESPONSE_SUCCES = 'RESPONSE_SUCCES';

export const saveNamePlayer = (payload) => ({ type: SAVE_NAME_PLAYER, payload });
export const convertedGravatarEmail = (payload) => ({
  type: CONVERTED_GRAVATAR_EMAIL,
  payload,
});

// export const getResult = (payload) => ({ type: RESPONSE_SUCCES, payload });

// export function fetchApi() {
//   return async (dispatch) => {
//     try {
//       const magicNum = 5;
//       const token = localStorage.getItem('token');
//       const endPoint = `https://opentdb.com/api.php?amount=${magicNum}&token=${token}`;
//       const response = await fetch(endPoint);
//       const data = await response.json();
//       // console.log(data);
//       dispatch(getResult(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }
