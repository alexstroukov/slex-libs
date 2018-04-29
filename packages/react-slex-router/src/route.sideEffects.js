import _ from 'lodash'
import * as actionTypes from './route.actionTypes'
import * as statuses from './route.statuses'
import actions from './route.actions'
import selectors from './route.selectors'

class RouteSideEffects {
  _pathsMatch = (prev, next) => {
    return prev === next || prev === next + '/'
  }
  _defaultValidate = () => true
  validateRouteOnChangeRoute = ({ validators = {} }) => {
    return ({ dispatch, getState, prevState, nextState, action }) => {
      if (action.type === actionTypes.ROUTE_LOADING) {
        const { route: { routeState: { path: currentPath } = {} } = {} } = prevState
        const { routeName, routeState, validate } = action
        const validator = validators[validate] || this._defaultValidate
        return Promise
          .resolve(validator({ state: prevState, routeName, routeState }))
          .then(routeAllowed => {
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
      }
    }
  }
}

export default new RouteSideEffects()
