# oauth-examples

## Set up Github

- On your [Github Apps page](https://github.com/settings/applications), register an app like this:

![](http://url.brentvatne.ca/1bXD0.png)

- Add your `clientId` and `clientSecret` to `credentials.js`

## Set up Reddit

- On your [Reddit Apps page](https://www.reddit.com/prefs/apps), register an app like this:

![](http://url.brentvatne.ca/12nFh.png)

- Add your `clientId` to `credentials.js`

## Using it in the real world

You will need to register separate apps on Github and Reddit for
development and production because the redirect URIs will be different.
