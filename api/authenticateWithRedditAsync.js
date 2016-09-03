import {
  Linking,
  NativeModules,
} from 'react-native';

import qs from 'qs';
import { Buffer } from 'buffer/';

import credentials from '../credentials';

const CLIENT_ID = credentials.reddit.clientId;
const REDIRECT_URL = `${NativeModules.ExponentConstants.linkingUri}reddit`;

if (REDIRECT_URL !== 'exp://localhost:19000/+reddit') {
  alert(`Invalid redirect url: ${REDIRECT_URL}`);
}

let stateParam;

export default async function authenticateWithRedditAsync() {
  try {
    let code = await _askPermission();
    let result = await _createTokenWithCode(code);
    return result.access_token;
  } catch(e) {
    return null;
  }
}

function _createTokenWithCode(code) {
  const url = `https://www.reddit.com/api/v1/access_token` +
    `?grant_type=authorization_code` +
    `&code=${code}` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`;

  const authorizationHash = new Buffer(`${CLIENT_ID}:`).toString('base64');

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${authorizationHash}`
    },
  }).then(res => res.json());
}

function _askPermission() {
  return new Promise((resolve, reject) => {
    // let listener = DeviceEventEmitter.addListener('Exponent.openUri', handleUrl);
    let listener = Linking.addEventListener('url', handleUrl);

    // Some random string
    state = (new Date()).valueOf().toString();

    function handleUrl(event) {
      const result = qs.parse(event.url.split('?')[1]);

      if (result.state !== state) {
        reject(`state mismatch: result: ${result.state} request: ${state}`);
      }

      Linking.removeEventListener('url', handleUrl);
      resolve(result.code);
    }

    const url = 'https://www.reddit.com/api/v1/authorize' +
      `?client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&state=${state}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}` +
      `&duration=permanent` +
      `&scope=identity`;

    Linking.openURL(url);
  });
}
