import _ from 'lodash'
import * as actionTypes from './route.actionTypes'
import * as statuses from './route.statuses'
import actions from './route.actions'
import selectors from './route.selectors'
import routeSubscribers from './routeSubscribers'

class RouteSideEffects {
  notifyRouteSubscribersOnRouteChangeSideEffect = ({ prevState, nextState, action, dispatch }) => {
    if (
      action.type === actionTypes.PENDING_ROUTE_ACCESS_DENIED ||
      action.type === actionTypes.PENDING_ROUTE_ERROR ||
      action.type === actionTypes.PENDING_ROUTE_READY ||
      action.type === actionTypes.ROUTE_LOADING
    ) {
      const route = selectors.getRoute(nextState)
      routeSubscribers.notifySubscribers('route', subscriber => {
        subscriber({ route })
      })
    }
  }

}

export default new RouteSideEffects()
