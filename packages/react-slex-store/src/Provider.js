import React, { Component, PropTypes, Children } from 'react'

class Provider extends Component {

  constructor (props, context) {
    super(props, context)
    this.store = props.store
  }

  getChildContext () {
    return { store: this.store }
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }),
  children: PropTypes.element.isRequired
}

Provider.childContextTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  })
}

export default Provider
