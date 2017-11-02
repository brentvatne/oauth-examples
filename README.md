# oauth-examples

In the `api/` directory there are `authenticateWith*Async` functions
that handle the OAuth flow for services like Github and Reddit.

All you need to do is add your credentials for this to work in your app,
and if you build a standalone app, make sure you set a scheme (see the
[AuthSession guide](https://docs.expo.io/versions/latest/sdk/auth-session.html)) for
more info.

## Run the project

- Clone this project and run `npm install`
- Install [XDE](https://docs.expo.io/versions/latest/introduction/installation.html) (or exp, via `npm i -g exp`)
- Rename `credentials.example.js` to `credentials.js`
- Open this project in XDE (or exp, via `exp start`)
- Start the simulator or connect to the project from the Expo client on your phone
- Process to the following set up steps to register applications with services you want to authenticate with.

### Set up a Github application

- On your [Github Apps page](https://github.com/settings/applications), register an app like this:

![](http://url.brentvatne.ca/1bXD0.png)

- Add your `clientId` and `clientSecret` to `credentials.js`

### Set up a Reddit application

- On your [Reddit Apps page](https://www.reddit.com/prefs/apps), register an app like this:

![](http://url.brentvatne.ca/12nFh.png)

- Add your `clientId` to `credentials.js`
