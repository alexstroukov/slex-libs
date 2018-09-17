const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const baseExec = require('child_process').exec
const ora = require('ora')
const spinner = ora()

function update () {
  const rootPath = __dirname
  return fetchConfig({ rootPath })
    .then(packages => {
      const packageNames = packages.join(' ')
      return updatePackages({ packageNames })
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
function updatePackages ({ packageNames }) {
  const command = `npm i ${packageNames}`
  const commandText = `[slex-update]: updating ${packageNames}`
  spinner.start(commandText)
  return exec(command, { cwd: path })
    .then(() => {
      spinner.succeed(commandText)
    })
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