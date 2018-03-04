import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import styles from './styles'

class IndeterminateProgress extends Component {
  show = this.props.show
  state = {
    show: !!this.props.show
  }

  componentWillReceiveProps (nextProps) {
    let timeout
    let animationFrame
    if (this.show !== nextProps.show) {
      this.show = nextProps.show
      if (this.show) {
        timeout && clearTimeout(timeout)
        animationFrame && cancelAnimationFrame(animationFrame)
        if (this.state.show !== nextProps.show) {
          this.showState({ show: nextProps.show })
        }
      } else {
        timeout = setTimeout(() => {
          animationFrame = requestAnimationFrame(() => {
            this.showState && this.showState({ show: nextProps.show })
          })
        })
      }
    }
  }

  componentWillMount () {
    this.showState = ({ show }) => {
      this.setState({ show })
    }
  }

  componentWillUnmount () {
    this.showState = undefined
  }

  render () {
    const { classes, size = 1, orientation, className, style = {} } = this.props
    const { show } = this.state
    const containerStyle = orientation === 'vertical' ? classes.containerVertical : classes.containerHorizontal
    const loaderStyle = orientation === 'vertical' ? classes.indeterminateVertical : classes.indeterminateHorizontal
    return (
      <div
        className={classNames(containerStyle, className)}
        style={{
          ...style,
          opacity: show ? 1 : 0,
          [orientation === 'vertical' ? 'width' : 'height']: size
        }}
      >
        <div className={loaderStyle} />
      </div>
    )
  }
}

IndeterminateProgress.defaultProps = {
  orientation: 'horizontal'
}

IndeterminateProgress.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.number,
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(IndeterminateProgress)
