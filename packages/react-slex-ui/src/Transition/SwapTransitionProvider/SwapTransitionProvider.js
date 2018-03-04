import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { TransitionMotion } from 'react-motion'

class SwapTransitionProvider extends PureComponent {
  willEnter = () => {
    return this.props.atEnter
  }
  willLeave = () => {
    return this.props.atLeave
  }
  renderRoute = config => {
    const { key, style, data } = config
    const containerProps = {
      key,
      style: this.props.mapStyles(style)
    }
    return (
      <div {...containerProps}>
        {data}
      </div>
    )
  }
  renderRoutes = interpolatedStyles => {
    return (
      <div className={this.props.className} style={this.props.style}>
        {interpolatedStyles.map(this.renderRoute)}
      </div>
    )
  }
  render () {
    const { skipInitial, contentName, atEnter, atActive, children } = this.props
    const defaultStyles = !skipInitial ? [{
      key: contentName,
      data: children,
      style: atEnter
    }] : null
    const styles = [{
      key: contentName,
      data: children,
      style: atActive
    }]
    return (
      <TransitionMotion
        defaultStyles={defaultStyles}
        styles={styles}
        willEnter={this.willEnter}
        willLeave={this.willLeave}
      >
        {this.renderRoutes}
      </TransitionMotion>
    )
  }
}

SwapTransitionProvider.propTypes = {
  skipInitial: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  contentName: PropTypes.string.isRequired,
  atEnter: PropTypes.object.isRequired,
  atActive: PropTypes.object.isRequired,
  atLeave: PropTypes.object.isRequired,
  mapStyles: PropTypes.func
}

SwapTransitionProvider.defaultProps = {
  mapStyles: val => val,
  skipInitial: false
}

export default SwapTransitionProvider
