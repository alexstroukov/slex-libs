import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import styles from './styles'

class Sidebar extends PureComponent {
  render () {
    const { classes, sidebarButtons, ...rest } = this.props
    return (
      <div
        className={classes.container}
      >
        <div
          className={classes.menu}
          {...rest}
        >
          {sidebarButtons}
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  sidebarButtons: PropTypes.any
}

export default withStyles(styles)(Sidebar)
