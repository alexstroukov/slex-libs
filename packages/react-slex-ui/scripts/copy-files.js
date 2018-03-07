const fs = require('fs')

function movePackageJson () {
  return readFile(`./package.json`)
    .then(content => {
      const { scripts, devDependencies, ...packageDataOther } = JSON.parse(content);
      const newPackageData = {
        ...packageDataOther,
        main: './index.js',
        module: './reactSlexUi.js',
        private: false
      }
      return writeFile(`./compiled/package.json`, JSON.stringify(newPackageData, null, 2))
    })
}

movePackageJson()

function writeFile (location, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(location, content, 'utf8', function (err, data) {
      if (err) {
        console.log(`failed to write file ${location}. Error: ${err}`)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function readFile (location) {
  return new Promise((resolve, reject) => {
    fs.readFile(location, 'utf8', function (err, data) {
      if (err) {
        console.log(`failed to read file ${location}. Error: ${err}`)
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
