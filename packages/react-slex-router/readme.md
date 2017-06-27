# Slex Router

```
$ npm install slex-router
```

`react-slex-router` is a `slex-store` connected and component driven router implementation for`react`. Its state is kept in its own store similar to `redux-router` combined with `react-router`.

## Example Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from 'slex-store'
import { Provider } from 'react-slex-store'
import route, { Router, Route } from 'react-slex-router'

const store = createStore({
  route
})

store.subscribe(renderApp)
renderApp()

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
        <Route path={'/items'} name={'ITEMS'} validate={validateRoute}>
          <Items />
        </Route>
        <Route path={'/items/:id'} name={'ITEM_DETAILS'} validate={validateRoute}>
          <ItemDetails />
        </Route>
      </Router>
    </Provider>
  ), document.getElementById('app'))
}

function validateRoute ({ routeName, routeState }) {
  const userIsAllowerToViewRoute = true
  return userIsAllowerToViewRoute
}

```

## Route Actions

`ROUTE_LOADING` - Triggered when url changes. Puts said route in pending state alongside the current route and set the store status to loading. `{ status: 'LOADING', routeName, routeState, pendingRoute: { routeName, routeState } }`

&darr;

`PENDING_ROUTE_READY` - Triggered when `validate` resolves with a truthy result. Sets the pending route to `routeName` and `routeState` upon successful validation and puts store in ready state. `{ status: 'READY', routeName, routeState }`

`PENDING_ROUTE_ACCESS_DENIED` - Triggered when `validate` resolves with a falsy result. Sets store in ready state upon unsuccessful validation whilst keeping the pending route. `{ status: 'READY', routeName, routeState,pendingRoute: { routeName, routeState } }`

&darr;

`PENDING_ROUTE_ERROR` - Triggered when `validate` resolves with an error or rejected promise. Sets store in error state whilst keeping the pending route. `{ status: 'ERROR', routeName, routeState, pendingRoute: { routeName, routeState } }`

## Route Validation

You can validate access to routes by providing a validate function to `Route`. It can be be sync or async and resolve truthy for valid routes `({ routeName, routeState }) => Promise<boolean> || boolean`

```
<Route validate={validateRoute} path={path} name={name} />
```

## Useful Middleware

### Loading data on route change

When routing to a page you often need to load data in stores that are used to display data on the page, this is often done on `componentWillMount`. You can also do it via middleware to decouple this logic from the UI.

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