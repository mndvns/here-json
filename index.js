/**
 * Module dependencies
 */

var stdin = require('get-stdin')
var parse = require('whatever-format');
var YAML = require('json2yaml');
var pygmentize = require('pygmentize-bundled');

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

    if (!opts.color)
      return console.log(output);

    var config = {
      lang: !!opts.yaml ? 'yaml' : 'json',
      format: !!opts.html ? 'html' : 'console'
    };

    pygmentize(config, output, function(err, result) {
      if (err) return console.error(err);
      process.stdout.write(result.toString());
    });
  });
}
