var bugsnag = require('@tsjing/bugsnag'),
    util = require('util'),
    winston = require('winston')

function Bugsnag (options) {
  winston.Transport.call(this, options);
  options = options || {};

  this.level = options.level || 'error'
  this.name = 'bugsnag'
}

util.inherits(Bugsnag, winston.Transport)

Bugsnag.prototype.log = function (level, msg, meta, callback) {

  // map of winston:bugsnag log levels
  // @see https://github.com/winstonjs/winston#logging-levels
  // @see https://bugsnag.com/docs/notifiers/node#severity
  const levelMapping = {
    info: 'info',
    error: 'error',
    warn: 'warning'
  }

  if (level in levelMapping) {
    bugsnag.notify(msg, {
      severity: levelMapping[level]
    }, meta)
  }

  callback(null, true)

}

module.exports = Bugsnag