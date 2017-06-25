import router from 'slex-router'
import Router from './Router'
import Route from './Route'
import * as actionTypes from './route.actionTypes'
import * as statuses from './route.statuses'
import actions from './route.actions'
import reducers from './route.reducers'

function replace ({ path, extras }) {
  return router.replace({ path, extras })
}
function push ({ path, extras }) {
  return router.push({ path, extras })
}
const initialState = {
  status: statuses.INITIAL,
  routeName: undefined,
  routeState: undefined,
  previousRoute: undefined,
  pendingRoute: undefined,
  error: undefined
}

export { Router, Route, actionTypes, statuses, actions, replace, push }
export default function reduceRoute (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ROUTE_LOADING:
      return reducers.routeLoading(state, action)
    case actionTypes.PENDING_ROUTE_READY:
      return reducers.pendingRouteReady(state, action)
    case actionTypes.PENDING_ROUTE_ACCESS_DENIED:
      return reducers.pendingRouteAccessDenied(state, action)
    case actionTypes.PENDING_ROUTE_ERROR:
      return reducers.pendingRouteError(state, action)
    default:
      return state
  }
}
