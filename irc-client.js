irc = Npm.require('irc');

ClientIRC = function(server, nick, actions, options) {
    var self = this;
    self.client = null;
    self.server = server;
    self.nick = nick;
    self.actions = actions;
    self.options = options;

    // private:
    self.toJoin = [];
    self.connected = false;

    if (typeof arguments[2] == 'object') {
        var keys = Object.keys(self.actions);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (arguments[2][k] !== undefined) {
                self.actions[k] = arguments[2][k];
            }
        }
    }

    if (typeof arguments[3] == 'object') {
        var keys = Object.keys(self.options);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (arguments[3][k] !== undefined) {
                self.options[k] = arguments[3][k];
            }
        }
    }

    self.client = new irc.Client(self.server, self.nick, self.options);
    var obj = self;
    self.client.addListener('registered', function(message) {
        self.connected = true;
        var chan = self.toJoin.pop();
        while (chan) {
            self.join(chan);
            chan = self.toJoin.pop();
        }
    });

    var keys = Object.keys(self.actions);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        self.client.addListener(k, self.actions[k]);
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

/**
 * Joins the specified channel.
 *
 * @param {string} channel - Channel to join
 * @param {function} callback -Callback to automatically subscribed to the join#channel event,
 *     but removed after the first invocation. channel supports multiple JOIN arguments as a space
 *     separated string (similar to the IRC protocol).
 */
ClientIRC.prototype.join = function(channel, callback) {
    var self = this;
    if (self.connected) {
        self.client.join(channel, callback);
    } else {
        self.toJoin.push(channel);
    }
};

/**
 * Parts the specified channel.
 *
 * @param {string} channel - Channel to part
 * @param {string} message - Optional message to send upon leaving the channel
 * @param {function} callback - Callback to automatically subscribed to the part#channel event,
 *     but removed after the first invocation.
 */
ClientIRC.prototype.part = function(channel, message, callback) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.part(channel, message, callback);
    }
};

/**
 * Sends a message to the specified target.
 *
 * @param {string} target - is either a nickname, or a channel.
 * @param {string} message - the message to send to the target.
 */
ClientIRC.prototype.say = function(target, message) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.say(target, message);
    }
};

/**
 * Sends a CTCP message to the specified target.
 *
 * @param {string} target - is either a nickname, or a channel.
 * @param {string} type - the type of the CTCP message. Specify “privmsg” for a PRIVMSG,
 *     and anything else for a NOTICE.
 * @param {string} text - the CTCP message to send.
 */
ClientIRC.prototype.ctcp = function(target, type, text) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.ctcp(target, type, text);
    }
};

/**
 * Sends an action to the specified target.
 *
 * @param {string} target
 * @param {string} message
 */
ClientIRC.prototype.action = function(target, message) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.action(target, message);
    }
};

/**
 * Sends a notice to the specified target.
 *
 * @param {string} target - is either a nickname, or a channel.
 * @param {string} message - the message to send as a notice to the target.
 */
ClientIRC.prototype.notice = function(target, message) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.notice(target, message);
    }
};

/**
 * Request a whois for the specified nick.
 *
 * @param {string} nick - is a nickname
 * @param {function} callback - Callback to fire when the server has finished generating the whois
 *     information and is passed exactly the same information as a whois event described above.
 */
ClientIRC.prototype.whois = function(nick, callback) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.whois(nick, callback);
    }
};

/**
 * Request a channel listing from the server. The arguments for this method are fairly server
 * specific, this method just passes them through exactly as specified. Responses from the server
 * are available via the channellist_start, channellist_item, and channellist events.
 *
 * @param {[object]} args
 */
ClientIRC.prototype.list = function(args) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.list(args);
    }
};

/**
 * Connects to the server. Used when autoConnect in the options is set to false. If retryCount is
 * a function it will be treated as the callback (i.e. both arguments to this function are optional).
 *
 * @param {integer} retryCount - Optional number of times to attempt reconnection
 * @param {function} callback - Optional callback
 */
ClientIRC.prototype.connect = function(retryCount, callback) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.connect(retryCount, callback);
    }
};

/**
 * Disconnects from the IRC server. If message if a function it will be treated as the callback
 * (i.e. both arguments to this function are optional).
 *
 * @param {string} message - Optional message to send when disconnecting.
 * @param {function} callback - Optional callback
 */
ClientIRC.prototype.disconnect = function(message, callback) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.disconnect(message, callback);
    }
};

/**
 * Activates flood protection “after the fact”. You can also use floodProtection while instantiating
 * the Client to enable flood protection, and floodProtectionDelay to set the default message interval.
 *
 * @param {integer} interval - Optional configuration for amount of time to wait between messages.
 *     Takes value from client configuration if unspecified.
 */
ClientIRC.prototype.activateFloodProtection = function(interval) {
    var self = this;
    if (typeof self.client === 'object') {
        self.client.activateFloodProtection(interval);
    }
};
