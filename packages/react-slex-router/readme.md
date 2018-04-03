[![CircleCI](https://circleci.com/gh/alexstroukov/react-slex-router.svg?style=svg)](https://circleci.com/gh/alexstroukov/react-slex-router)

# React Slex Router

```
$ npm install react-slex-router
```

`react-slex-router` is a component driven router implementation for `react`. It is connected to `slex-store` via `react-slex-store` and its state is kept in its own store similar to how `redux-router` combined with `react-router`.

It differs from that however because `react-slex-router` breaks routing into 3 stages:

1. Url changes set store state to loading and puts route into pending state to indicate that a route is changing.

2. Route validation is preformed to determine if access is allowed for the user.

3. Route is taken out of pending status and route workflow is completed.

## Route Action Sequence

`ROUTE_LOADING` - Triggered when url changes. Puts said route in pending state alongside the current route and set the store status to loading. `{ status: 'LOADING', routeName, routeState, pendingRoute: { routeName, routeState } }`

&darr;

`PENDING_ROUTE_READY` - Triggered when `validate` resolves with a truthy result. Sets the pending route to `routeName` and `routeState` upon successful validation and puts store in ready state. `{ status: 'READY', routeName, routeState }`

`PENDING_ROUTE_ACCESS_DENIED` - Triggered when `validate` resolves with a falsy result. Sets store in ready state upon unsuccessful validation whilst keeping the pending route. `{ status: 'READY', routeName, routeState,pendingRoute: { routeName, routeState } }`

&darr;

`PENDING_ROUTE_ERROR` - Triggered when `validate` resolves with an error or rejected promise. Sets store in error state whilst keeping the pending route. `{ status: 'ERROR', routeName, routeState, pendingRoute: { routeName, routeState } }`

## Example Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import slexStore from 'slex-store'
import { Provider } from 'react-slex-store'
import route, { Router, Route, createRouteMiddleware } from 'react-slex-router'

const store = slexStore.createStore({
  reducer: slexStore.createReducer({
    route
  }),
  middleware: [
    createRouteMiddleware({ validators: new Validators() })
  ]
})

store.subscribe(renderApp)

function renderApp (state) {
  ReactDOM.render((
    <Provider store={store}>
      <Router>
        <Route path={'/'} name={'HOME'}>
          <HomePage />
        </Route>
        <Route path={'/login'} name={'LOGIN'}>
          <LoginPage />
        </Route>
        <Route path={'/items'} name={'ITEMS'} validate={'validateItems'}>
          <Items />
        </Route>
        <Route path={'/items/:id'} name={'ITEM_DETAILS'} validate={'validateItemDetails'}>
          <ItemDetails />
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('app'))
}

class Validators {
  validateItems = ({ routeName, routeState }) => {
    const userIsAllowerToViewRoute = true
    return userIsAllowerToViewRoute
  }
}

```

## Route Validation

You can validate access to routes by providing a validate function to `Route`. It can be be sync or async and resolve truthy for valid routes `({ routeName, routeState }) => Promise<boolean> || boolean`

```
<Route validate={validate} path={path} name={name} />
```

## Useful Middleware

### Loading data on route change

When routing to a page you often need to load data in stores that are used to display data on the page, this is often done on `componentDidMount`. You can also do it via middleware to decouple this logic from the UI.

```javascript
import { actionTypes as routeActionTypes } from 'react-slex-router'

function loadDataOnRouteChangeMiddleware (dispatch, getState, action) {
  const { type: actionType } = action
  const { route: { pendingRoute: { routeName } = {} } } = getState()
  if (actionType === routeActionTypes.PENDING_ROUTE_READY && routeName === 'YOUR_ROUTE') {
    dispatch(loadDataAction)
  }
}

```

### Redirecting on route access denied

When access to a route is denied it is good practice to redirect a user either to a route where the denial of access can be addressed - usually a login page or an error page. You can achieve this with a middleware.

```javascript
import { replace, actionTypes as routeActionTypes } from 'react-slex-router'

redirectOnAccessDeniedMiddleware (dispatch, getState, action) {
  const { type: actionType } = action
  const { route: { routeState: { path: currentPath } } = {} } = getState()
  if (actionType === routeActionTypes.PENDING_ROUTE_ACCESS_DENIED) {
    const isLoggedIn = true
    if (isLoggedIn) {
      replace({ path: currentPath || '/' })
    } else {
      replace({ path: '/login' })
    }
  }
}
```