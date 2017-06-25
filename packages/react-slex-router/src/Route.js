import React, { PropTypes, Children, PureComponent } from 'react'

class Route extends PureComponent {
  render () {
    const { component: Component } = this.props
    if (Component) {
      return <Component {...this.props} />
    } else {
      return Children.only(this.props.children)
    }
  }
}

Route.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func,
  component: PropTypes.func,
  children: PropTypes.object.isRequired
}

export default Route
