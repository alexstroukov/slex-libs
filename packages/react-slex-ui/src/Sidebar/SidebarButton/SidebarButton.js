import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import ButtonBase from 'material-ui/ButtonBase'
import styles from './styles'

class SidebarButton extends PureComponent {
  render () {
    const { classes, icon, label, ...rest } = this.props
    return (
      <ButtonBase
        component={'div'}
        className={classes.container}
        {...rest}
      >
        {icon}
        {label}
      </ButtonBase>
    )
  }
}

SidebarButton.propTypes = {
  icon: PropTypes.any,
  label: PropTypes.any
}

export default withStyles(styles)(SidebarButton)
