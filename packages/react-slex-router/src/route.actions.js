import * as actionTypes from './route.actionTypes'
import slexStoreWorker from 'slex-store-worker'
import { disconnectAction } from 'react-slex-store'

class RouteActions {
  changeRoute = ({ routeName, routeState, validate }) => {
    const action = {
      type: actionTypes.CHANGE_ROUTE,
      routeName,
      routeState,
      validate
    }
    return disconnectAction(
      slexStoreWorker.prioritiseAction(
        action
      )
    )
  }
  routeLoading = ({ routeName, routeState }) => {
    const action = {
      type: actionTypes.ROUTE_LOADING,
      routeName,
      routeState
    }
    return disconnectAction(
      slexStoreWorker.prioritiseAction(
        action
      )
    )
  }
  pendingRouteReady = () => {
    const action = {
      type: actionTypes.PENDING_ROUTE_READY
    }
    return disconnectAction(
      slexStoreWorker.prioritiseAction(
        action
      )
    )
  }
  pendingRouteAccessDenied = () => {
    const action = {
      type: actionTypes.PENDING_ROUTE_ACCESS_DENIED
    }
    return disconnectAction(
      slexStoreWorker.prioritiseAction(
        action
      )
    )
  }
  pendingRouteError = ({ error }) => {
    const action = {
      type: actionTypes.PENDING_ROUTE_ERROR,
      error
    }
    return disconnectAction(
      slexStoreWorker.prioritiseAction(
        action
      )
    )
  }
}

export default new RouteActions()
