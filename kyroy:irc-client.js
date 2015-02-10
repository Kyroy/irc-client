irc = Npm.require('irc');

ClientIRC = function(server, nick, options, display, ircOptions) {
    var self = this;
    self.client = null;
    self.server = server;
    self.nick = nick;
    self.options = {
        debug: true,
        db: new Meteor.Collection('irc')
    };
    self.display = {
        registered: true,
        motd: true,
        // names: true, // may be deleted
        // topic: true,
        // join: true,
        // part: true,
        // quit: true,
        // kick: true,
        // kill: true,
        message: true,
        // message#: false,
        // pm: false,
        // notice: true,
        // // ctcp??
        // nick: true,
        // invite: true,
        // plusMode: true,
        // minusMode: true,
        // whois: true,
        // raw: true,
        error: true
    };
    self.ircOptions = {
        debug: true
    };

    if (typeof arguments[2] == 'object') {
        var keys = Object.keys(self.options);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (arguments[2][k] !== undefined) {
                self.options[k] = arguments[2][k];
            }
        }
    }

    if (typeof arguments[3] == 'object') {
        var keys = Object.keys(self.display);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (arguments[3][k] !== undefined) {
                self.display[k] = arguments[3][k];
            }
        }
    }

    if (typeof arguments[4] == 'object') {
        var keys = Object.keys(self.ircOptions);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (arguments[4][k] !== undefined) {
                self.ircOptions[k] = arguments[4][k];
            }
        }
        keys = Object.keys(arguments[4]);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (self.ircOptions[k] === undefined) {
                self.ircOptions[k] = arguments[4][k];
            }
        }
    }
};

/**
 * Prints a debug message, if debug flag set.
 * @param {string} message
 */
_debug = function(message) {
    if (true) {
        console.log('ClientIRC debug:', message);
    }
};

/**
 * Connect the client to the server!
 */
ClientIRC.prototype.connect = function() {
    var self = this;
    self.client = new irc.Client(self.server, self.nick, self.ircOptions);

    var keys = Object.keys(self.display);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (self.display[k]) {
            self.client.addListener(k, self['_' + k]);
        }
    }
};

/**
 * Emitted when the server sends the initial 001 line, indicating you’ve
 * connected to the server. See the raw event for details on the message object.
 * @param {object} message
 */
ClientIRC.prototype._registered = function(message) {
    console.log('registered:', message);
};

/**
 * Emitted when the server sends the message of the day to clients.
 * @param {string} motd
 */
ClientIRC.prototype._motd = function(motd) {

};

/**
 * Emitted when a message is sent. to can be either a nick (which is most
 * likely this clients nick and means a private message), or a channel
 * (which means a message to that channel). See the raw event for details
 * on the message object.
 * @param {string} nick
 * @param {string} to
 * @param {string} text
 * @param {object} message
 */
ClientIRC.prototype._message = function(nick, to, text, message) {
    _debug('message: ' + nick + ' => ' + to + ': ' + text);
    _debug(message);
};

/**
 * Emitted when ever the server responds with an error-type message.
 * The message parameter is exactly as in the ‘raw’ event.
 * @param {string} message
 */
ClientIRC.prototype._error = function(message) {
    _debug(message);
};
