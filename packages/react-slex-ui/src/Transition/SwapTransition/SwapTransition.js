import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SwapTransitionProvider from '../SwapTransitionProvider'
import { spring } from 'react-motion'
import _ from 'lodash'

class SwapTransition extends Component {
  _getTransitionsProps = () => {
    const { transition, style } = this.props
    const popConfig = { stiffness: 360, damping: 25 }

    switch (transition) {
      case 'top':
        return {
          atEnter: {
            scale: 0.8,
            opacity: 0
          },
          atLeave: {
            scale: spring(0.8, popConfig),
            opacity: spring(0, popConfig)
          },
          atActive: {
            scale: spring(1, popConfig),
            opacity: 1
          },
          mapStyles (styles) {
            return {
              width: '100%',
              opacity: styles.opacity,
              transform: `scale(${styles.scale})`
            }
          }
        }

      case 'fade':
        return {
          atEnter: {
            opacity: 0
          },
          atLeave: {
            opacity: 0
          },
          atActive: {
            opacity: spring(1, { stiffness: 120, damping: 17 })
          },
          mapStyles (styles) {
            return {
              width: '100%',
              ...style,
              ...styles
            }
          }
        }
      default:
        return undefined
    }
  }

  render () {
    const { transition, contentName, className, style, children, key } = this.props
    const content = React.cloneElement(children, { key: contentName })
    if (transition !== 'none') {
      const transitionProps = this._getTransitionsProps()
      return (
        <SwapTransitionProvider
          className={className}
          style={style}
          contentName={contentName}
          {...transitionProps}
        >
          {content}
        </SwapTransitionProvider>
      )
    } else {
      return content
    }
  }
}

SwapTransition.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  contentName: PropTypes.string.isRequired,
  transition: PropTypes.oneOf(['none', 'fade'])
}

export default SwapTransition
