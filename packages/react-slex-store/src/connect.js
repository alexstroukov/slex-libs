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
        this.unsubscribe = this.store.subscribe((state, action) => {
          const blacklist = this.store.blacklist || []
          if (action && !blacklist.includes(action.type)) {
            this.hasStoreStateChanged = true
            this.forceUpdate()
          }
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
        const mergedProps = fn(this.store.dispatch, this.store.getState, this.props)
        if (
          this._element && 
          this._prevMergedProps && 
          shallowEquals(this._prevMergedProps, mergedProps)
        ) {
          return this._element
        } else {
          this._prevMergedProps = mergedProps
          this.hasStoreStateChanged = false
          this.hasPropsStateChanged = false
          this._element = <WrappedComponent {...mergedProps} />
          return this._element
        }
      }
    }
    Connected.propTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
        blacklist: PropTypes.array
      })
    }
    Connected.contextTypes = {
      store: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
        blacklist: PropTypes.array
      })
    }
    return Connected
  }
}

export default connect
