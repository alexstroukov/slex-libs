import * as actionTypes from './route.actionTypes'

class RouteActions {
  changeRoute = ({ routeName, routeState, validate }) => {
    return this.routeLoading({ routeName, routeState, validate })
  }
  routeLoading = ({ routeName, routeState, validate }) => {
    const action = {
      type: actionTypes.ROUTE_LOADING,
      routeName,
      routeState,
      validate
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
}

export default new RouteActions()
