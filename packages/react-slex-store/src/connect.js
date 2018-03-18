import PropTypes from 'prop-types'
import React, { Component } from 'react'
import shallowEquals from './shallowEquals'

function connect (fn) {
  return WrappedComponent => {
    class Connected extends Component {
      constructor (props, context) {
        super(props, context)
        this.store = props.store || context.store
      }
      componentDidMount () {
        this.unsubscribe = this.store.subscribe(state => {
          this.hasStoreStateChanged = true
          this.forceUpdate()
        })
      }
      componentWillUnmount () {
        this.unsubscribe && this.unsubscribe()
        this.unsubscribe = undefined
      }
      componentWillReceiveProps (nextProps) {
        this.hasPropsStateChanged = !shallowEquals(this.props, nextProps)
      }
      shouldComponentUpdate () {
        return this.hasStoreStateChanged || this.hasPropsStateChanged
      }
      render () {
        const nextProps = fn(this.store.dispatch, this.store.getState, this.props)
        this.hasStoreStateChanged = false
        this.hasPropsStateChanged = false
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
