require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('oauth2 app', () => {
  before(() => {
    // It's a good idea to store your Client ID and Secret in the environment rather than in code.
    // This works locally via the `export` shell command and in production by using `zapier env`
    if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      throw new Error('For the tests to run, you need to do `export CLIENT_ID=1234 CLIENT_SECRET=asdf`');
    }
  });
});
