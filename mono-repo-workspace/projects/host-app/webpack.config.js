const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "mfeApp": "http://localhost:4200/remoteEntry.js",
    "studentApp": "http://localhost:4200/remoteEntry.js",
    "adminApp": "http://localhost:4200/remoteEntry.js",
    "teacherApp": "http://localhost:4200/remoteEntry.js",    
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
