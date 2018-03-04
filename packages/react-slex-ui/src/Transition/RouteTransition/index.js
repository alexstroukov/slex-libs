import RouteTransition from './RouteTransition'
import { connect } from 'react-slex-store'

export default connect((dispatch, getState, ownProps) => {
  const { route: { routeName, routeState: { extras: { transition = 'fade' } = {} } } } = getState()
  return {
    ...ownProps,
    routeName,
    transition
  }
})(RouteTransition)
