#!/usr/bin/env node
const meow = require('meow')
const _ = require('lodash')
const link = require('./link')

const cli = meow(`
	Usage
	  $ slex-link
	Requirements
		slex-link-config.json
		{
			"package-name": "../path/to/package"
		}
`)

link()
