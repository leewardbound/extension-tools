var child_process = require('child_process');
var fs = require('fs');
var Q = require('q');

function exec() {
	var result = Q.defer();
	var proc = child_process.spawn(arguments[0], Array.prototype.slice.call(arguments,1));
	var stdout = '';
	proc.stdout.on('data', function(data) {
		stdout += data.toString();
	});
	proc.stderr.on('data', function(data) {
		console.log(data.toString());
	});
	proc.on('close', function(status) {
		result.resolve([status, stdout]);
	});
	return result.promise;
}

module.exports = exec;

