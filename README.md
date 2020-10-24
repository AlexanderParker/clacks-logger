# What is clacks-logger?

This is a plugin for the [clacks](https://github.com/AlexanderParker/clacks) p2p messaging system.

Its simple purpose is to log messages recieved by a clacks instance to the filesystem.

# Basic Usage

**Prerequisites**

This plugin requires [clacks](https://github.com/AlexanderParker/clacks)

**Installing**

    > npm install clacks-logger

**Loading**

Clacks plugins are loaded into an instance with the "extend" function, as demonstrated below (assuming you have created a clacksInstance already):
	
	Logger = require('clacks-logger')
    clacksInstance.extend(new Logger({<options>}))

**Options**

When instantiating the logger, you can provide some basic options if you wish

* **directory**: A string representing the base output directory that log will be written to (Default: "./logger").
* **type**: A string specifying what message types will be logged, which can be either "all", "message", or "announce" (Default: "all").

So to output logs to "./custom/location" and only log "message" types, you would do the following:

	clacksInstance.extend(new Logger({
		directory: './custom/location',
		type: 'message'
	}))

# Log Format

Every clacks peer has a unique identity hash, which is derived from their hostname. This forms the basis of the log path for the payload.

When a payload is logged, the filename is simply the current timestamp, determined by Date.now()

Thefore a payload will be logged to a file according to this pattern: "[base log directory]/[peer hash]/[timestamp]"

The contents of the log file is a JSON string with the following format:

	{
		peer: {<peer object>}
		payload: {<payload object>}
	}

For the format of the logged objects please refer to the primary clacks documentation accordingly:

* **[peer](https://github.com/AlexanderParker/clacks#peers)** - outlines the clacks peer object structure.
* **[payload](https://github.com/AlexanderParker/clacks#message-payload)** - outlines the clacks message payload structure.

# Contributing

If this project interests you, all contributions are welcome, from pull requests to suggestions and bug reports.

For clacks-logger specific issues, please use this [issue tracker](https://github.com/AlexanderParker/clacks-logger/issues) if you spot any problems, have general questions, ideas or feedback.

For core clacks-p2p issues, please use the main [issue tracker](https://github.com/AlexanderParker/clacks/issues) instead.