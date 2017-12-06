import * as routeStatuses from './route.statuses'

class RouteSelectors {
  getLoading = (state) => {
    const {
      route: {
        status
      }
    } = state
    return status === routeStatuses.LOADING
  }
  getRouteState = (state) => {
    const {
      route: {
        routeState = {}
      }
    } = state
    return routeState
  }
  getRouteName = (state) => {
    const {
      route: {
        routeName
      }
    } = state
    return routeName
  }
}

export default new RouteSelectors()
