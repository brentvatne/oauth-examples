import { AuthSession, Constants } from 'expo';
import qs from 'qs';
import credentials from '../credentials';

const CLIENT_ID = credentials.github.clientId;
const CLIENT_SECRET = credentials.github.clientSecret;

const REDIRECT_URL = AuthSession.getRedirectUrl();
const AUTH_URL =
  'https://github.com/login/oauth/authorize' +
  `?client_id=${CLIENT_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;

export default async function authenticateWithGithubAsync() {
  try {
    let authResult = await AuthSession.startAsync({
      authUrl: AUTH_URL,
    });

    if (authResult.type !== 'success') {
      return;
    }

    let code = authResult.params.code;

    // Warning! You should actually do this part on your server so you don't leak your secret!
    // I only put it here for fun.
    let result = await _createTokenWithCode(code);
    return result.access_token;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function _createTokenWithCode(code) {
  const url =
    'https://github.com/login/oauth/access_token' +
    `?client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}` +
    `&code=${code}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}
