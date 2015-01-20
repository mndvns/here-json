/**
 * Module dependencies
 */

var stdin = require('get-stdin')
var parse = require('whatever-format');

/**
 * Expose `hereJson`
 * @param {Object} opts
 */

module.exports = hereJson;

function hereJson(opts) {
  opts = opts || {};
  stdin(function(string) {
    var json = JSON.stringify(parse.decode(string), null, opts.pretty ? '  ' : '');
    process.stdout.write(json);
  });
}
