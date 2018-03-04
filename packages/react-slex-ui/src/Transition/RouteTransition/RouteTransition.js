import PropTypes from 'prop-types'
import React from 'react'
import SwapTransition from '../SwapTransition'

const RouteTransition = (props) => {
  const { transition, routeName, className, style, children } = props
  return (
    <SwapTransition
      transition={transition}
      className={className}
      style={style}
      contentName={routeName}
    >
      {children}
    </SwapTransition>
  )
}

RouteTransition.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  routeName: PropTypes.string.isRequired,
  transition: PropTypes.oneOf(['none', 'fade'])
}

export default RouteTransition
