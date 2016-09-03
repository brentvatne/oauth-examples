# oauth-examples

In the `api/` directory there are `authenticateWith*Async` functions
that handle the OAuth flow for services like Github and Reddit.

To use this with an Exponent app, you don't have to change pretty much
anything (although you should read the `Using it in the real world`
section -- and register another application for the redirect url that
you would have when published).

It's a bit more complicated with vanilla React Native because you
need to give your app a scheme so you can redirect back to the
application via the redirect URL. If you'd like to add instructions
for how to do that here, a pull request is welcome, otherwise just
use Exponent :)

## Run the project

- Clone this project and run `npm install`
- Install [XDE](https://docs.getexponent.com/versions/latest/introduction/installation.html)
- Rename `credentials.example.js` to `credentials.js`
- Open this project in XDE
- Start the simulator or connect to the project from the Exponent client on your phone
- Process to the following set up steps to register applications with services you want to authenticate with.

### Set up a Github application

- On your [Github Apps page](https://github.com/settings/applications), register an app like this:

![](http://url.brentvatne.ca/1bXD0.png)

- Add your `clientId` and `clientSecret` to `credentials.js`

### Set up a Reddit application

- On your [Reddit Apps page](https://www.reddit.com/prefs/apps), register an app like this:

![](http://url.brentvatne.ca/12nFh.png)

- Add your `clientId` to `credentials.js`

### Using it in the real world

You will need to register separate apps on Github and Reddit for
development and production because the redirect URIs will be different.
