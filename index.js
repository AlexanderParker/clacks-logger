/*
	Message logger plugin for clacks-p2p
	Implements a basic message logger, useful for profiling and debugging
*/

const fs = require('fs')
/*
	Initialise the logger plugin with options.

	Options format:
	{
		directory: 'base/log/directory',
		type: 'message|announce|all',
		prefix: 'filename-prefix',
		suffix: 'filename-suffix'
	}

	Default options:

	directory: "./logger"
	type: "./all"
	prefix: ""
	suffix: ""

*/

module.exports = function(options) {
	var logDirectory = "./logger",
		logType = "all",
		filenamePrefix = "",
		filenameSuffix = ""

	// Apply options overrides
	if (!!options && !!options.directory) logDirectory = options.directory
	if (!!options && !!options.type) logType = options.type
	if (!!options && !!options.prefix) filenamePrefix = options.prefix
	if (!!options && !!options.suffix) filenameSuffix = options.suffix

	// Check logger directory
	if (!fs.existsSync(logDirectory)) {
		fs.mkdirSync(logDirectory, {recursive: true});
	}

	return function(peer, payload, req, res) {
		// Crude way to ensure valid identifier
		if (!peer || !peer.identifier || !peer.identifier.match(/[A-Fa-f0-9]{64}/)) return		

		// Only log messages
		if (logType != 'all' && (!payload.type || payload.type != logType)) return

		// Message is logged to filesystem in logir/identifier/timestamp
		var peerLogDirectory = logDirectory + '/' + peer.identifier,
			peerLogFilename = filenamePrefix + Date.now() + filenameSuffix

		// Ensure log directory exists (is sync for now, may improve later)
		if (!fs.existsSync(peerLogDirectory)) {
			fs.mkdirSync(peerLogDirectory);
		}

		// Log message to the file (is sync for now, may improve later)
		fs.writeFileSync(peerLogDirectory + '/' + peerLogFilename, JSON.stringify({
			peer: peer,
			payload: payload
		}))
	}
}
