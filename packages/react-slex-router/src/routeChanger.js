
import _ from 'lodash'
import actions from './route.actions'

class RouteChanger {
  _pathsMatch = (prev, next) => {
    return prev === next || prev === next + '/'
  }
  changeRoute = ({ getState, dispatch, routeName, routeState, validate = () => true }) => {
    const { route: { routeState: { path: currentPath } = {} } = {} } = getState()
    const isAlreadyTheActiveRoute = this._pathsMatch(currentPath, routeState.path)
    if (!isAlreadyTheActiveRoute) {
      dispatch(actions.routeLoading({ routeName, routeState }))
      return Promise
        .resolve(validate({ getState: getState, routeName, routeState }))
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
    } else {
      return Promise.resolve()
    }
  }
}

export default new RouteChanger()
