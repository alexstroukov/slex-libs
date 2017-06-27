import * as actionTypes from './route.actionTypes'

class RouteActions {

  constructor () {
    this.changeRoute = this.changeRoute.bind(this)
    this.routeLoading = this.routeLoading.bind(this)
    this.pendingRouteReady = this.pendingRouteReady.bind(this)
    this.pendingRouteAccessDenied = this.pendingRouteAccessDenied.bind(this)
    this.pendingRouteError = this.pendingRouteError.bind(this)
  }

  routeLoading ({ routeName, routeState }) {
    const action = {
      type: actionTypes.ROUTE_LOADING,
      routeName,
      routeState
    }
    return action
  }

  pendingRouteReady () {
    const action = {
      type: actionTypes.PENDING_ROUTE_READY
    }
    return action
  }

  pendingRouteAccessDenied () {
    const action = {
      type: actionTypes.PENDING_ROUTE_ACCESS_DENIED
    }
    return action
  }

  pendingRouteError ({ error }) {
    const action = {
      type: actionTypes.PENDING_ROUTE_ERROR,
      error
    }
    return action
  }

  changeRoute ({ validateRoute = () => true, routeName, routeState }) {
    return (dispatch, getState) => {
      const { route: { routeState: { path: currentPath } = {} } } = getState()
      const isAlreadyTheActiveRoute = pathsMatch(currentPath, routeState.path)
      if (!isAlreadyTheActiveRoute) {
        dispatch(this.routeLoading({ routeName, routeState }))
        Promise.resolve(validateRoute({ routeName, routeState }))
          .then(routeAllowed => {
            const { route: { pendingRoute: { routeState: { path: pendingPath } = {} } } } = getState()
            const pathIsStillPending = pathsMatch(pendingPath, routeState.path)
            if (pathIsStillPending) {
              if (routeAllowed) {
                dispatch(this.pendingRouteReady())
              } else {
                dispatch(this.pendingRouteAccessDenied())
              }
            }
          })
          .catch(error => {
            const { route: { pendingRoute: { routeState: { path: pendingPath } = {} } = {} } } = getState()
            const pathIsStillPending = pathsMatch(pendingPath, routeState.path)
            if (pathIsStillPending) {
              dispatch(this.pendingRouteError({ error }))
            }
          })
      }
    }

    function pathsMatch (prev, next) {
      return prev === next || prev === next + '/'
    }
  }
}

export default new RouteActions()
