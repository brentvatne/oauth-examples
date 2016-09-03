import {
  Linking,
  NativeModules,
} from 'react-native';

import qs from 'qs';

import credentials from '../credentials';

const CLIENT_ID = credentials.github.clientId;
const CLIENT_SECRET = credentials.github.clientSecret;
const REDIRECT_URL = `${NativeModules.ExponentConstants.linkingUri}github`;

export default async function authenticateWithGithubAsync() {
  try {
    let code = await _askPermission();
    let result = await _createTokenWithCode(code);
    return result.access_token;
  } catch(e) {
    return null;
  }
}

function _createTokenWithCode(code) {
  const url = 'https://github.com/login/oauth/access_token' +
    `?client_id=${CLIENT_ID}` +
    `&client_secret=${CLIENT_SECRET}` +
    `&code=${code}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
}

function _askPermission() {
  return new Promise((resolve, reject) => {
    let listener = Linking.addEventListener('url', handleUrl);

    function handleUrl(event) {
      const result = qs.parse(event.url.split('?')[1]);
      resolve(result.code);
      Linking.removeEventListener('url', handleUrl);
    }

    Linking.openURL(
      'https://github.com/login/oauth/authorize' +
       `?client_id=${CLIENT_ID}` +
       `&redirect_uri=${encodeURIComponent(REDIRECT_URL)}`
    );
  });
}
