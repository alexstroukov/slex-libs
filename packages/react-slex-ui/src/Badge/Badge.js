import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import styles from './styles'

class Badge extends Component {
  render () {
    const { classes, icon, className, ...rest } = this.props
    return (
      <div
        className={classNames(classes.container, className)}
        {...rest}
      >
        <Icon className={classes.icon}>{icon}</Icon>
      </div>
    )
  }
}

Badge.propTypes = {
  icon: PropTypes.string
}

export default withStyles(styles)(Badge)
