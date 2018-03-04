import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import SidebarButtonIconLoadingPlaceholder from '../SidebarButtonIconLoadingPlaceholder'
import Icon from '../../Icon'

class SidebarButtonIcon extends PureComponent {
  render () {
    const { classes, icon, loading, dashed, ...rest } = this.props
    if (loading) {
      return (
        <SidebarButtonIconLoadingPlaceholder dashed={dashed} {...rest} />
      )
    } else {
      return (
        <Icon {...rest}>
          {icon}
        </Icon>
      )
    }
  }
}

SidebarButtonIcon.propTypes = {
  icon: PropTypes.any
}

export default withStyles(styles)(SidebarButtonIcon)
