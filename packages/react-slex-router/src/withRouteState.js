import PropTypes from 'prop-types'
import React, { Component } from 'react'
import _ from 'lodash'
import selectors from './route.selectors'
import actions from './route.actions'
import * as statuses from './route.statuses'
import routeSubscribers from './routeSubscribers'

function withRouteState (WrappedComponent) {
  class ConnectedRoute extends Component {
    constructor (props, context) {
      super(props, context)
      this.store = this.props.store || this.context.routeStore
      this.state = {
        route: selectors.getRoute(this.store.getState())
      }
    }
    componentDidMount () {
      this.unsubscribe = routeSubscribers.subscribe('route', ({ route }) => {
        if (this.state.route !== route) {
          this.setState({
            route
          })
        }
      })
    }
    componentWillUnmount () {
      this.unsubscribe && this.unsubscribe()
    }
    render () {
      const { routeName, routeState, loading } = this.state.route
      return (
        <WrappedComponent
          {...this.props}
          routeName={routeName}
          routeState={routeState}
          loading={loading}
        />
      )
    }
  }
  ConnectedRoute.propTypes = {
    routeStore: PropTypes.object
  }
  ConnectedRoute.contextTypes = {
    routeStore: PropTypes.object
  }
  return ConnectedRoute
}

export default withRouteState
