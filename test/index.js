var fs = require('fs');
var exec = require('child_process').exec;
var should = require('should');

// clear screen
process.stdout.write('\u001B[2J');

fs.readdirSync('./test/cases').forEach(function(file) {
  if (~file.indexOf('.out')) return;
  var base = file.split('.')[0];
  describe('', function(){
    it(base + ' should equal ' + base + ' output', function(done){
      fs.readFile('./test/cases/' + file, 'utf8', function(err, data) {
        if (err) return done(err);
        exec(data, function(err, stdout, stderr) {
          if (err) return done(err);
          if (stderr) {
            console.error(stderr);
            return done();
          }
          fs.readFile('./test/cases/' + base + '.out', 'utf8', function(err, data) {
            stdout.trim().should.eql(data.trim());
            done();
          });
        });
      });
    });
  });
});
