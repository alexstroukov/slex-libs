import React, { Component, PropTypes } from 'react'

function connect (fn) {
  return WrappedComponent => {
    class Connected extends Component {
      render () {
        const store = this.props.store || this.context.store
        const nextProps = fn(store.dispatch, store.getState, this.props)
        return <WrappedComponent {...nextProps} />
      }
    }
    Connected.propTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired
      })
    }
    Connected.contextTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired
      })
    }
    return Connected
  }
}

export default connect
