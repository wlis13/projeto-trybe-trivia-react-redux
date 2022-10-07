async function fetchToken() {
  try {
    const urlToken = 'https://opentdb.com/api_token.php?command=request';
    const promise = await fetch(urlToken);
    const response = await promise.json();
    const { token } = response;
    return token;
  } catch (error) {
    return error;
  }
}

export default fetchToken;
