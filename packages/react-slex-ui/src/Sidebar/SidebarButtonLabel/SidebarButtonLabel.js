import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import SidebarButtonLabelLoadingPlaceholder from '../SidebarButtonLabelLoadingPlaceholder'
import Text from '../../Text'

class SidebarButtonLabel extends PureComponent {
  render () {
    const { classes, label, loading, dashed, ...rest } = this.props
    if (loading) {
      return (
        <div className={classes.container} {...rest}>
          <SidebarButtonLabelLoadingPlaceholder dashed={dashed} {...rest} />
        </div>
      )
    } else {
      return (
        <div className={classes.container} {...rest}>
          <div
            className={classes.text}
            noWrap
          >
            {label}
          </div>
        </div>
      )
    }
  }
}

SidebarButtonLabel.propTypes = {
  label: PropTypes.any
}

export default withStyles(styles)(SidebarButtonLabel)
