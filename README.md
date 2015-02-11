kyroy:irc-client
================

A wrapper for the npm package [irc](https://www.npmjs.com/package/irc).

## Installation
```
meteor add kyroy:irc-client
```

## Usage
```js
var client = ClientIRC('irc.yourserver.com', 'myNick', {
    'message': function(nick, to, text, message) {
        console.log('message: ', nick,  to, text);
    },
    'error': function(message) {
        console.log('Error:', message);
    }
});
client.join('#yourChannel');
```

### Constructor
```js
ClientIRC(server, nick[, actions, options])
```
The first two arguments are the server to connect to and the nickname to attempt to use.
The other arguments are optional.

Without the third argument, the client will actually do nothing.
There you can define functions for the events the irc package will emit (see documentation below).

The last argument ```options``` is directly passed to the npm irc package.
You can see the full documentation [here](https://node-irc.readthedocs.org/en/latest/).


### Change IRC Port
```js
var client = ClientIRC('irc.yourserver.com', 'myNick',
    {
       'message': function(nick, to, text, message) {
           console.log('message: ', nick,  to, text);
       },
       'error': function(message) {
           console.log('Error:', message);
       }
    }, {
        port: 12345
    }
);
```

### Functions
```js
client.connect();
```
If you pass ```options = { autoConnect: false }```, you can now connect to the server.

```js
client.join('#channelName');
```

```js
client.
```

``````js
client.
```

### Advanced
You can use full functionality of the npm irc package by using the field ```client``` of your ```ClientIRC``` object.
