exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
    /*'browserName': 'firefox'*/
  },

	baseUrl: 'http://localhost:8000',
  /*baseUrl: 'http://localhost:8000/app/',*/

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
