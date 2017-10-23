import _ from 'lodash'
import * as actionTypes from './route.actionTypes'
import actions from './route.actions'

export default function createRouteMiddleware ({ validators = {} }) {
  class EntityDetailsMiddleware {
    changeRouteMiddleware = (dispatch, getState, action) => {
      if (action.type === actionTypes.CHANGE_ROUTE) {
        const { validate, routeName, routeState } = action
        const { route: { routeState: { path: currentPath } = {} } } = getState()
        const isAlreadyTheActiveRoute = this._pathsMatch(currentPath, routeState.path)
        const validateRoute = validators[validate] || _.identity(true)
        if (!isAlreadyTheActiveRoute) {
          dispatch(actions.routeLoading({ routeName, routeState }))
          Promise
            .resolve(validateRoute({ routeName, routeState }))
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
                dispatch(actions.pendingRouteError({ error }))
              }
            })
        }
      }
    }
    _pathsMatch = (prev, next) => {
      return prev === next || prev === next + '/'
    }
  }
  
  return new EntityDetailsMiddleware()
}
