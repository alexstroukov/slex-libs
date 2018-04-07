import PropTypes from 'prop-types'
import React, { PureComponent, Children } from 'react'
import Route from './Route'
import _ from 'lodash'
import router from 'slex-router'
import selectors from './route.selectors'
import routeChanger from './routeChanger'

export class Router extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.store = props.store || context.store
    this.routes = _.chain([props.children])
      .flatten()
      .reject(_.isUndefined)
      .map(child => ({
        path: child.props.path,
        name: child.props.name,
        validate: child.props.validate
      }))
      .reduce((memo, next) => ({ ...memo, [next.path]: next }), {})
      .value()
    this.state = {
      routePattern: _.chain(this.store.getState())
        .get('route.routeState.routePattern')
        .value()
    }
  }
  componentDidMount () {
    this.subscribeStore()
    this.subscribeRouter()
  }
  componentWillUnmount () {
    this.routeStreamSubscription && this.routeStreamSubscription.dispose()
    this.unsubscribeStore && this.unsubscribeStore()
  }
  subscribeStore = () => {
    this.unsubscribeStore = this.store.subscribe((state) => {
      const routePattern = _.chain(state)
        .get('route.routeState.routePattern')
        .value()
      if (this.state.routePattern !== routePattern) {
        this.setState({
          routePattern
        })
      }
    })
  }
  subscribeRouter = () => {
    this.routeStream = router
      .createStream(this.routes)
    this.routeStreamSubscription = this.routeStream
      .subscribe(nextRoute => {
        const { route: { name: routeName, validate }, routeState } = nextRoute
        routeChanger.changeRoute({ dispatch: this.store.dispatch, getState: this.store.getState, routeName, routeState, validate })
      })
  }
  render () {
    const { routePattern } = this.state
    const { children } = this.props
    const route = _.chain([children])
      .flatten()
      .find(child => child.props.path === routePattern)
      .value()
    if (route) {
      return React.cloneElement(Children.only(route))
    } else {
      return null
    }
  }
}
Router.contextTypes = {
  store: PropTypes.object
}
Router.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName]
    let error = null
    React.Children.forEach(prop, function (child) {
      if (child && child.type !== Route) {
        error = new Error(`${componentName} children should be of type 'Route'.`)
      }
    })
    return error
  },
}

export default Router
