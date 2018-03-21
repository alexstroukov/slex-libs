import * as actionTypes from './route.actionTypes'

class RouteActions {
  routeLoading = ({ routeName, routeState }) => {
    const action = {
      type: actionTypes.ROUTE_LOADING,
      routeName,
      routeState
    }
    return action
  }
  pendingRouteReady = () => {
    const action = {
      type: actionTypes.PENDING_ROUTE_READY
    }
    return action
  }
  pendingRouteAccessDenied = () => {
    const action = {
      type: actionTypes.PENDING_ROUTE_ACCESS_DENIED
    }
    return action
  }
  pendingRouteError = ({ error }) => {
    const action = {
      type: actionTypes.PENDING_ROUTE_ERROR,
      error
    }
    return action
  }
  changeRoute = ({ validate, routeName, routeState }) => {
    const action = {
      type: actionTypes.CHANGE_ROUTE,
      validate,
      routeName,
      routeState
    }
    return action
  }
}

export default new RouteActions()
