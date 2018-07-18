[![CircleCI](https://circleci.com/gh/alexstroukov/slex-store-bootstrap.svg?style=svg)](https://circleci.com/gh/alexstroukov/slex-store-bootstrap)
# Slex Store Bootstrap

```
$ npm install slex-store-bootstrap
```

`slex-store-bootstrap` Is a set of slex-store bindings to delay rendering app until after bootstrapping is complete.

## Example Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'slex-store'
import { createBootstrap, createDeferredRenderApp } from 'slex-store-bootstrap'

const bootstrap = createBootstrap({
  restoreLogin: ({ dispatch, getState }) => {...}
})
const store = slexStore.createStore(
  slexStore.createDispatch({
    reducer: slexStore.createReducer({
      bootstrap: bootstrapReducer
    })
  })
)
const renderApp = createDeferredRenderApp((store) => {
  ReactDOM.render(<App />, document.getElementById('app'))
})

bootstrap(store)
renderApp(store)

```