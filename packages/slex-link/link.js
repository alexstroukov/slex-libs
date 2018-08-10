const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const baseExec = require('child_process').exec
const ora = require('ora')
const spinner = ora()

function link () {
  const rootPath = process.cwd()
  return fetchConfig({ rootPath })
    .then(packages => {
      const linkAllDependencies = () => _.chain(packages)
        .toPairs()
        .map(([ name, path ]) => () => addLink({ path, name }))
        .reduce((memo, next) => memo.then(next), Promise.resolve())
        .value()
      const linkAllPackages = () => _.chain(packages)
        .toPairs()
        .map(([ name, path ]) => () => linkToPackage({ rootPath, name }))
        .reduce((memo, next) => memo.then(next), Promise.resolve())
        .value()
      return linkAllDependencies()
        .then(linkAllPackages)
    })
}

function fetchConfig ({ rootPath }) {
  return readFile(`${rootPath}/slex-rc.json`)
    .then(packageJsonString => {
      try {
        return JSON.parse(packageJsonString)
      } catch (error) {
        return {}
      }
    })
    .catch(error => {
      throw new Error('Failed to load slex-rc.json')
    })
}
function addLink ({ path, name }) {
  const command = 'npm link'
  const commandText = `[slex-link]: linking ${name}`
  spinner.start(commandText)
  return exec(command, { cwd: path })
    .then(() => {
      spinner.succeed(commandText)
    })
}
function linkToPackage ({ rootPath, name }) {
  const command = `npm link ${name}`
  const commandText = `[slex-link]: linking to ${name}`
  spinner.text = commandText
  return exec(command, { cwd: rootPath })
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

module.exports = link