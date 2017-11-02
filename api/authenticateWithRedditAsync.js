import { AuthSession, Constants } from 'expo';
import qs from 'qs';
import { Buffer } from 'buffer/';

import credentials from '../credentials';

const CLIENT_ID = credentials.reddit.clientId;
const REDIRECT_URL = AuthSession.getRedirectUrl();

export default async function authenticateWithRedditAsync() {
  try {
    let state = new Date().valueOf().toString();
    let authUrl = _getAuthUrl(state);
    let authResult = await AuthSession.startAsync({ authUrl });

    if (authResult.type !== 'success') {
      return;
    }

    let { params } = authResult;

    if (params.state !== state) {
      throw new Error(`state mismatch: result: ${params.state} request: ${state}`);
    }

    let result = await _createTokenWithCode(params.code);
    return result.access_token;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function _getAuthUrl(state) {
  return (
    'https://www.reddit.com/api/v1/authorize' +
    `?client_id=${CLIENT_ID}` +
    `&response_type=code` +
    `&state=${state}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
    `&duration=permanent` +
    `&scope=identity`
  );
}

function _createTokenWithCode(code) {
  const url =
    `https://www.reddit.com/api/v1/access_token` +
    `?grant_type=authorization_code` +
    `&code=${code}` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;

  const authorizationHash = new Buffer(`${CLIENT_ID}:`).toString('base64');

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${authorizationHash}`,
    },
  }).then(res => res.json());
}