import _ from 'lodash'
import * as actionTypes from './route.actionTypes'
import * as statuses from './route.statuses'
import actions from './route.actions'
import selectors from './route.selectors'
import routeSubscribers from './routeSubscribers'

class RouteSideEffects {
  _pathsMatch = (prev, next) => {
    return prev === next || prev === next + '/'
  }
  _defaultValidate = () => true
  validateRouteOnChangeRoute = ({ validators = {} }) => {
    return ({ dispatch, getState, prevState, nextState, action }) => {
      if (action.type === actionTypes.CHANGE_ROUTE) {
        const { route: { routeState: { path: currentPath } = {} } = {} } = prevState
        const { routeName, routeState, validate } = action
        const isAlreadyTheActiveRoute = this._pathsMatch(currentPath, routeState.path)
        if (!isAlreadyTheActiveRoute) {
          dispatch(actions.routeLoading({ routeName, routeState }))
          const validator = validators[validate] || this._defaultValidate
          debugger
          return Promise
            .resolve(validator({ state: prevState, routeName, routeState }))
            .then(routeAllowed => {
              debugger
              const { route: { pendingRoute: { routeState: { path: pendingPath } = {} } } } = getState()
              const pathIsStillPending = this._pathsMatch(pendingPath, routeState.path)
              if (pathIsStillPending) {
                if (routeAllowed) {
                  dispatch(actions.pendingRouteReady())
                } else {
                  dispatch(actions.pendingRouteAccessDenied())
                }
              }
            })
            .catch(error => {
              const { route: { pendingRoute: { routeState: { path: pendingPath } = {} } = {} } } = getState()
              const pathIsStillPending = this._pathsMatch(pendingPath, routeState.path)
              if (pathIsStillPending) {
                dispatch(actions.pendingRouteError({ error: error.message }))
              }
            })
        } else {
          return Promise.resolve()
        }
      }
    }
  }
}

export default new RouteSideEffects()
