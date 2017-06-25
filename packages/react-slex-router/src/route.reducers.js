import * as statuses from './route.statuses'

class RouteReducers {

  constructor () {
    this.routeLoading = this.routeLoading.bind(this)
    this.pendingRouteReady = this.pendingRouteReady.bind(this)
    this.pendingRouteAccessDenied = this.pendingRouteAccessDenied.bind(this)
    this.pendingRouteError = this.pendingRouteError.bind(this)
  }

  routeLoading (state, action) {
    const { routeName, routeState } = action
    const nextState = {
      ...state,
      status: statuses.LOADING,
      previousRoute: state.pendingRoute || (state.routeState && state.routeName) && { routeName: state.routeName, routeState: state.routeState },
      pendingRoute: {
        routeState,
        routeName
      },
      error: undefined
    }
    return nextState
  }

  pendingRouteReady (state, action) {
    const nextState = {
      ...state,
      ...state.pendingRoute,
      status: statuses.READY,
      pendingRoute: undefined,
      error: undefined
    }
    return nextState
  }

  pendingRouteAccessDenied (state, action) {
    const nextState = {
      ...state,
      status: statuses.READY,
      error: undefined
    }
    return nextState
  }

  pendingRouteError (state, action) {
    const { error } = action
    const nextState = {
      ...state,
      status: statuses.ERROR,
      error
    }
    return nextState
  }
}

export default new RouteReducers()
