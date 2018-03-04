import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import IconButton from 'material-ui/IconButton'
import Icon from 'material-ui/Icon'
import styles from './styles'

class RoundButton extends Component {
  render () {
    const { classes, icon, className, ...rest } = this.props
    return (
      <IconButton
        aria-label={'edit'}
        className={classNames(classes.container, className)}
        {...rest}
      >
        <Icon className={classes.icon}>{icon}</Icon>
      </IconButton>
    )
  }
}

RoundButton.propTypes = {
  icon: PropTypes.string
}

export default withStyles(styles)(RoundButton)
