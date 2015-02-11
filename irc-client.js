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
        // ctcp??
        nick: true,
        invite: true,
        plusMode: true,
        minusMode: true,
        whois: true,
        raw: true,
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
 *
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
            if (k === 'messageHash') {
                self.client.addListener('message#', self['_' + k]);
            } else if (k === 'plusMode') {
                self.client.addListener('+mode', self['_' + k]);
            } else if (k === 'minusMode') {
                self.client.addListener('-mode', self['_' + k]);
            } else {
                self.client.addListener(k, self['_' + k]);
            }
        }
    }
};

///**
// * Sends a raw message to the server; generally speaking, it’s best not to use this
// * method unless you know what you’re doing. Instead, use one of the methods below.
// *
// * @param {string} command
// * @param arguments
// */
//ClientIRC.prototype.send = function(command) {
//
//};

//ClientIRC.prototype.join = function(channel, callback) {
//    var self = this;
//    if (typeof self.client === 'object') {
//        self.client.join(channel, callback);
//    }
//};


//--------------------------------------------------------------------
//-- Events
//--------------------------------------------------------------------

/**
 * Emitted when the server sends the initial 001 line, indicating you’ve
 * connected to the server. See the raw event for details on the message object.
 *
 * @param {object} message
 */
ClientIRC.prototype._registered = function(message) {
    console.log('registered:', message);
};

/**
 * Emitted when the server sends the message of the day to clients.
 *
 * @param {string} motd
 */
ClientIRC.prototype._motd = function(motd) {
    console.log('motd:', motd);
};

/**
 * Emitted when the server sends a list of nicks for a channel (which happens
 * immediately after joining and on request. The nicks object passed to the
 * callback is keyed by nick names, and has values ‘’, ‘+’, or ‘@’ depending on
 * the level of that nick in the channel.
 *
 * @param {string} channel
 * @param {[string]} nicks
 */
ClientIRC.prototype._names = function(channel, nicks) {
    console.log('names:', channel, nicks);
};

/**
 * Emitted when the server sends the channel topic on joining a channel, or
 * when a user changes the topic on a channel. See the raw event for details
 * on the message object.
 *
 * @param {string} channel
 * @param {string} topic
 * @param {string} nick
 * @param {string} message
 */
ClientIRC.prototype._topic = function(channel, topic, nick, message) {
    console.log('topic:', channel, topic, nick, message);
};

/**
 * Emitted when a user joins a channel (including when the client itself joins
 * a channel). See the raw event for details on the message object.
 *
 * @param {string} channel
 * @param {string} nick
 * @param {string} message
 */
ClientIRC.prototype._join = function(channel, nick, message) {
    console.log('join:', channel, nick, message);
};

/**
 * Emitted when a user parts a channel (including when the client itself parts
 * a channel). See the raw event for details on the message object.
 *
 * @param {string} channel
 * @param {string} nick
 * @param {string} reason
 * @param {string} message
 */
ClientIRC.prototype._part = function(channel, nick, reason, message) {
    console.log('part:', channel, nick, reason, message);
};

/**
 * Emitted when a user disconnects from the IRC, leaving the specified array
 * of channels. See the raw event for details on the message object.
 *
 * @param {string} nick
 * @param {string} reason
 * @param {string} channels
 * @param {string} message
 */
ClientIRC.prototype._quit = function(nick, reason, channels, message) {
    console.log('quit:', nick, reason, channels, message);
};

/**
 * Emitted when a user parts a channel (including when the client itself parts
 * a channel). See the raw event for details on the message object.
 *
 * @param {string} channel
 * @param {string} nick
 * @param {string} by
 * @param {string} reason
 * @param {string} message
 */
ClientIRC.prototype._kick = function(channel, nick, by, reason, message) {
    console.log('kick:', channel, nick, by, reason, message);
};

/**
 * Emitted when a user is killed from the IRC server. channels is an array of
 * channels the killed user was in which are known to the client.
 * See the raw event for details on the message object.
 *
 * @param {string} nick
 * @param {string} reason
 * @param {string} channels
 * @param {string} message
 */
ClientIRC.prototype._kill = function(nick, reason, channels, message) {
    console.log('kill:', nick, reason, channels, message);
};

/**
 * Emitted when a message is sent. to can be either a nick (which is most
 * likely this clients nick and means a private message), or a channel
 * (which means a message to that channel). See the raw event for details
 * on the message object.
 *
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
 * Emitted when a message is sent to any channel (i.e. exactly the same as the
 * message event but excluding private messages. See the raw event for details
 * on the message object.
 *
 * @param {string} nick
 * @param {string} to
 * @param {string} text
 * @param {object} message
 */
ClientIRC.prototype._messageHash = function(nick, to, text, message) {
    _debug('message#: ' + nick + ' => ' + to + ': ' + text);
    _debug(message);
};

/**
 * Emitted when a notice is sent. to can be either a nick (which is most likely
 * this clients nick and means a private message), or a channel (which means a
 * message to that channel). nick is either the senders nick or null which means
 * that the notice comes from the server. See the raw event for details on the
 * message object.
 *
 * @param {string} nick
 * @param {string} to
 * @param {string} text
 * @param {string} message
 */
ClientIRC.prototype._notice = function(nick, to, text, message) {
    console.log('notice:', nick, to, text, message);
};

/**
 * As per ‘message’ event but only emits when the message is direct to the client.
 * See the raw event for details on the message object.
 *
 * @param {string} nick
 * @param {string} text
 * @param {string} message
 */
ClientIRC.prototype._pm = function(nick, text, message) {
    console.log('pm:', nick, text, message);
};

/**
 * Emitted when a user changes nick along with the channels the user is in.
 * See the raw event for details on the message object.
 *
 * @param {string} oldnick
 * @param {string} newnick
 * @param {[string]} channels
 * @param {string} message
 */
ClientIRC.prototype._nick = function(oldnick, newnick, channels, message) {
    console.log('nick:', oldnick, newnick, channels, message);
};

/**
 * Emitted when the client recieves an /invite. See the raw event for details
 * on the message object.
 *
 * @param {string} channel
 * @param {string} from
 * @param {string} message
 */
ClientIRC.prototype._invite = function(channel, from, message) {
    console.log('invite:', channel, from, message);
};

/**
 * Emitted when a mode is added to a user or channel. channel is the channel
 * which the mode is being set on/in. by is the user setting the mode. mode is
 * the single character mode indentifier. If the mode is being set on a user,
 * argument is the nick of the user. If the mode is being set on a channel,
 * argument is the argument to the mode. If a channel mode doesn’t have any
 * arguments, argument will be ‘undefined’. See the raw event for details on
 * the message object.
 *
 * @param {string} channel
 * @param {string} by
 * @param {string} mode
 * @param {string} argument
 * @param {string} message
 */
ClientIRC.prototype._plusMode = function(channel, by, mode, argument, message) {
    console.log('+mode:', channel, by, mode, argument, message);
};

/**
 * Emitted when a mode is removed from a user or channel. channel is the channel
 * which the mode is being set on/in. by is the user setting the mode. mode is
 * the single character mode indentifier. If the mode is being set on a user,
 * argument is the nick of the user. If the mode is being set on a channel,
 * argument is the argument to the mode. If a channel mode doesn’t have any
 * arguments, argument will be ‘undefined’. See the raw event for details on
 * the message object.
 *
 * @param {string} channel
 * @param {string} by
 * @param {string} mode
 * @param {string} argument
 * @param {string} message
 */
ClientIRC.prototype._minusMode = function(channel, by, mode, argument, message) {
    console.log('-mode:', channel, by, mode, argument, message);
};

/**
 * Emitted when a notice is sent. to can be either a nick (which is most likely
 * this clients nick and means a private message), or a channel (which means a
 * message to that channel). nick is either the senders nick or null which means
 * that the notice comes from the server. See the raw event for details on the
 * message object.
 *
 * @param {object} info
 */
ClientIRC.prototype._whois = function(info) {
    console.log('whois:', info);
};

/**
 * Emitted when ever the client receives a “message” from the server. A message is
 * basically a single line of data from the server, but the parameter to the callback
 * has already been parsed and contains:
 *
 * @param {object} message = {
 *     prefix: "The prefix for the message (optional)",
 *     nick: "The nickname portion of the prefix (optional)",
 *     user: "The username portion of the prefix (optional)",
 *     host: "The hostname portion of the prefix (optional)",
 *     server: "The servername (if the prefix was a servername)",
 *     rawCommand: "The command exactly as sent from the server",
 *     command: "Human readable version of the command",
 *     commandType: "normal, error, or reply",
 *     args: ['arguments', 'to', 'the', 'command'],
 * }
 */
ClientIRC.prototype._raw = function(message) {
    console.log('raw:', message);
};

/**
 * Emitted when ever the server responds with an error-type message.
 * The message parameter is exactly as in the ‘raw’ event.
 * @param {string} message
 */
ClientIRC.prototype._error = function(message) {
    console.log('ClientIRC ERROR:', message);
};
