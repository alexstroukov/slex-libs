import PropTypes from 'prop-types'
import React, { Children, PureComponent } from 'react'

class Route extends PureComponent {
  render () {
    const { component: Component } = this.props
    if (Component) {
      return <Component {...this.props} />
    } else {
      return this.props.children
        ? Children.only(this.props.children)
        : null
    }
  }
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  component: PropTypes.func,
  children: PropTypes.object
}

export default Route
