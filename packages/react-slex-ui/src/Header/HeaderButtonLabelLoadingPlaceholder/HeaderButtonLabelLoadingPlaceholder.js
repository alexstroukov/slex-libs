import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'

class HeaderButtonLabelLoadingPlaceholder extends PureComponent {
  render () {
    const { classes, className, dashed } = this.props
    return (
      <div className={classNames(classes.container, className)}>
        {dashed && <div className={classes.dashed} />}
      </div>
    )
  }
}
export default withStyles(styles)(HeaderButtonLabelLoadingPlaceholder)
