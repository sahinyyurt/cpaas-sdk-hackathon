import { BASE_URL } from "../constants";
export const getTokens = async ({ clientId, username, password }) => {
  const formBody = createFormBody({
    client_id: clientId,
    username,
    password,
    grant_type: "password",
    scope: "openid"
  });

  // POST a request to create a new authentication access token.
  const cpaasAuthUrl = `https://${BASE_URL}/cpaas/auth/v1/token`;
  const fetchResult = await fetch(cpaasAuthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formBody
  });

  // Parse the result of the fetch as a JSON format.
  const data = await fetchResult.json();

  return { accessToken: data.access_token, idToken: data.id_token };
}

const createFormBody = (paramsObject) => {
  const keyValuePairs = Object.entries(paramsObject).map(
    ([key, value]) => encodeURIComponent(key) + "=" + encodeURIComponent(value)
  );
  return keyValuePairs.join("&");
}
