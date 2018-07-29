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