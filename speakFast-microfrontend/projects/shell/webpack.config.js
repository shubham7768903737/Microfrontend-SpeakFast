const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    admin: 'http://localhost:4201/remoteEntry.js',
    student: 'http://localhost:4202/remoteEntry.js',
    teacher: 'http://localhost:4203/remoteEntry.js',
    studentRegistratin: 'http://localhost:4204/remoteEntry.js',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
