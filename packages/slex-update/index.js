#!/usr/bin/env node
const meow = require('meow')
const _ = require('lodash')
const update = require('./update')

const cli = meow(`
	Usage
	  $ slex-update
	Requirements
		slex-rc.json
		{
			"slex-update": {
				"package-name": "../path/to/package"
			}
		}
`)

update()
