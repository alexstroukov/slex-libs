[![CircleCI](https://circleci.com/gh/alexstroukov/slex-libs.svg?style=svg)](https://circleci.com/gh/alexstroukov/slex-libs)

# Slex Cache

```
$ npm install slex-cache
```

`slex-cache` is a wrapper over indexedDb which exposes a simple cache interface.

## Usage

```javascript
import cache from 'slex-cache'

cache.setItem('key', value).then(...)
cache.getItem('key').then(...)
cache.removeItem('key').then(...)
```