import _ from 'lodash'
import * as routeStatuses from './route.statuses'
import { memoizeArgs } from 'slex-memoize'

const defaultRouteState = {}
class RouteSelectors {
  getLoading = (state) => {
    const {
      route: {
        status
      }
    } = state
    return this._getLoadingFromStatus(status)
  }
  getRoute = (state) => {
    const {
      route: {
        routeState = defaultRouteState,
        routeName,
        status
      }
    } = state
    const loading = this._getLoadingFromStatus(status)
    return this._getRoute(routeName, routeState, loading)
  }
  _getLoadingFromStatus = status => status === routeStatuses.LOADING
  _getRoute = memoizeArgs((routeName, routeState, loading) => {
    return {
      routeName,
      routeState,
      loading
    }
  })
  getRouteState = (state) => {
    const {
      route: {
        routeState = defaultRouteState
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
