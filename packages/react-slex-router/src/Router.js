import React, { PureComponent, PropTypes, Children } from 'react'
import { connect } from 'react-slex-store'
import Route from './Route'
import _ from 'lodash'
import router from 'slex-router'
import actions from './route.actions'

class Router extends PureComponent {
  constructor (props) {
    super(props)
    this.routes = _.chain([props.children])
      .flatten()
      .map(child => ({
        path: child.props.path,
        name: child.props.name,
        validate: child.props.validate
      }))
      .reduce((memo, next) => ({ ...memo, [next.path]: next }), {})
      .value()
  }

  componentDidMount () {
    const { changeRoute } = this.props
    this.routeStream = router
      .createStream(this.routes)
      .subscribe(nextRoute => {
        const { route: { name: routeName, validate: validateRoute }, routeState } = nextRoute
        changeRoute({ validateRoute, routeName, routeState })
      })
  }

  render () {
    const { routePattern, children } = this.props
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
  changeRoute: PropTypes.func.isRequired,
  routePattern: PropTypes.string
}

export default connect((dispatch, getState, ownProps) => {
  const { route: { routeState: { routePattern } = {} } = {} } = getState()
  const changeRoute = ({ validateRoute, routeName, routeState }) => dispatch(actions.changeRoute({ validateRoute, routeName, routeState }))
  return {
    ...ownProps,
    changeRoute,
    routePattern
  }
})(Router)
