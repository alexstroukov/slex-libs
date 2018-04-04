[![CircleCI](https://circleci.com/gh/alexstroukov/slex-memoize.svg?style=svg)](https://circleci.com/gh/alexstroukov/slex-memoize)

# Slex Memoize

```
$ npm install slex-memoize
```

`slex-memoize` is a memoize function which supports multiple arguments.

## Usage

```javascript
import memoize from 'slex-memoize'
// import memoize, { memoizeArgs as memoize } from 'slex-memoize'

const arg1 = {}
const arg2 = []
const arg3 = () => {}

const memoized = memoize((arg1, arg2, arg3) => {
  // do something
})

const result1 = memoize(arg1, arg2, arg3)
const result2 = memoize(arg1, arg2, arg3)

console.info(result1 === result2) // true
```
## Usage for options pattern


```javascript
import { memoizeOptions as memoize } from 'slex-memoize'

const arg1 = {}
const arg2 = []
const arg3 = () => {}

const memoized = memoize(({ arg1, arg2, arg3 }) => {
  // do something
})

const result1 = memoize({ arg1, arg2, arg3 })
const result2 = memoize({ arg1, arg2, arg3 })

console.info(result1 === result2) // true
```