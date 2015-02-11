kyroy:irc-client
================

More than a wrapper for the npm package [irc](https://www.npmjs.com/package/irc).

## Installation
```
meteor add kyroy:irc-client
```

## Basic Usage
```js
var client = ClientIRC('irc.yourserver.com', 'myNick');
client.join('#yourChannel');
```

### Constructor
```js
ClientIRC(server, nick[, options, display, ircOptions])
```
The first two arguments are the server to connect to and the nickname to attempt to use.
The other arguments are optional with the following default values:
```js
options = {
    debug: true,
    db: new Meteor.Collection('irc')
};
display = {
    registered: true,
    motd: true,
    names: true, // may be deleted
    topic: true,
    join: true,
    part: true,
    quit: true,
    kick: true,
    kill: true,
    message: true,
    messageHash: false,
    pm: false,
    notice: true,
    nick: true,
    invite: true,
    plusMode: true,
    minusMode: true,
    whois: true,
    raw: true,
    error: true
};
ircOptions = {
    debug: true
};
```

### Change IRC Port
```js
var client = ClientIRC('irc.yourserver.com', 'myNick', undefined, undefined, {
    port: 12345
});
```

### More
The last argument ```ircOptions``` is directly passed to the npm irc package.
You can see the full documentation [here](https://node-irc.readthedocs.org/en/latest/).