# React Slex Store

```
$ npm install react-slex-store
```

`react-slex-store` is a connector for `slex-store` similar to what `react-redux` is to `redux`. It allows components to `connect` to the `slex-store` to gain access to store data and `dispatch`.

## Example Usage

### 1. Provide store

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from 'slex-store'
import { Provider } from 'react-slex-store'

const store = createStore({ ... })

store.subscribe(renderApp)
renderApp()

function renderApp (state) {
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ))
}

```

### 1. Connect to store

```javascript
// Dumb Component

import React, { Component } from 'react'

class App extends Component {
  render () {
    const { propertyFromStore, wrappedDispatchFunction } = this.props
    return (
      ...
    )
  }
}
export default App

// Connected Component

import App from './App'
import testStoreActions from './testStoreActions'
import { connect } from 'react-slex-store'

export default connect ((dispatch, getState, ownProps) => {
  const { testStore: { propertyFromStore } } = getState()
  const wrappedDispatchFunction = () => {
    return dispatch(testStoreActions.doSomething())
  }
  return {
    ...ownProps,
    wrappedDispatchFunction,
    propertyFromStore
  }
})(App)

```
