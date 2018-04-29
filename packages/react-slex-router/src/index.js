import router from 'slex-router'
import Router from './Router'
import Route from './Route'
import * as actionTypes from './route.actionTypes'
import * as statuses from './route.statuses'
import selectors from './route.selectors'
import actions from './route.actions'
import sideEffects from './route.sideEffects'
import reducers from './route.reducers'
import replace from './replace'
import push from './push'

const initialState = {
  status: statuses.INITIAL,
  routeName: undefined,
  routeState: undefined,
  previousRoute: undefined,
  pendingRoute: undefined,
  error: undefined
}
function reduceRouteClient (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ROUTE_LOADING:
      return reducers.routeLoading(state, action)
    default:
      return state
  }
}
function reduceRouteWorker (state = initialState, action) {
  switch (action.type) {
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

export { reduceRouteClient, reduceRouteWorker, Router, Route, actionTypes, statuses, actions, sideEffects, selectors, replace, push }