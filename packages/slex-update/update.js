const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const baseExec = require('child_process').exec
const ora = require('ora')

function update () {
  const rootPath = process.cwd() 
  return fetchConfig({ rootPath })
    .then(packages => {
      return updatePackages({ rootPath, packages })
    })
}

function fetchConfig ({ rootPath }) {
  return readFile(`${rootPath}/slex-rc.json`)
    .then(packageJsonString => {
      try {
        return JSON.parse(packageJsonString)['slex-update']
      } catch (error) {
        return {}
      }
    })
    .catch(error => {
      throw new Error('Failed to load slex-rc.json')
    })
}
function updatePackages ({ rootPath, packages }) {
  return _.chain(packages)
    .map(package => () => {
      const spinner = ora()
      const command = `npm install ${package}`
      const commandText = `[slex-update]: updating ${package}`
      spinner.start(commandText)
      return exec(command, { cwd: rootPath })
        .then(() => {
          spinner.succeed(commandText)
        })
    })
    .reduce((memo, next) => memo.then(next), Promise.resolve())
    .value()
}

function exec (command, options) {
  return new Promise((resolve, reject) => {
    baseExec(command, options, (err, stdout, stderr) => {
      if (err) {
        console.error(err)
        reject(err)
      } else if (stderr) {
        resolve(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}
function readFile (location) {
  return new Promise((resolve, reject) => {
    fs.readFile(location, 'utf8', function (err, data) {
      if (err) {
        console.error(`failed to read file ${location}. Error: ${err}`)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = update