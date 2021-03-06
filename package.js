Package.describe({
    name: 'kyroy:irc-client',
    version: '0.1.0',
    // Brief, one-line summary of the package.
    summary: 'A wrapper for the npm package irc.',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/Kyroy/irc-client',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.0.3.1');
    api.export('ClientIRC');
    api.addFiles('irc-client.js', 'server');
});

Npm.depends({
    'irc': '0.3.9'
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('irc-client');
    api.addFiles('irc-client-tests.js');
});
