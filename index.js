/**
 * Module dependencies
 */

var stdin = require('get-stdin')
var parse = require('whatever-format');
var YAML = require('json2yaml');

/**
 * Expose `hereJson`
 * @param {Object} opts
 */

module.exports = hereJson;

function hereJson(opts) {
  opts = opts || {};
  stdin(function(string) {
    var json;
    try {
      json = JSON.parse(string);
    } catch(e) {
      json = parse.decode(string);
    }

    var output = !opts.yaml
     ? JSON.stringify(json, null, opts.pretty ? '  ' : '')
     : YAML.stringify(json);
    process.stdout.write(output);
  });
}
