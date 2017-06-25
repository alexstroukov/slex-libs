import React, { Component, PropTypes, Children } from 'react'

let applicationStore

function connect (fn) {
  return WrappedComponent => {
    return class Connected extends Component {
      render () {
        if (!applicationStore) {
          throw new Error('Provider must be rendered at the root.')
        }
        const nextProps = fn(applicationStore.dispatch, applicationStore.getState, this.props)
        return <WrappedComponent {...nextProps} />
      }
    }
  }
}

export default class Provider extends Component {

  constructor (props, context) {
    super(props, context)
    this.store = props.store
    applicationStore = props.store
  }

  render () {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  })
}

export { Provider, connect }
