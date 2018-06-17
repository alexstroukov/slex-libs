import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { snackbarService } from '../Snackbar'
import classNames from 'classnames'
import styles from './styles'

class ScreenContent extends PureComponent {
  componentWillReceiveProps (nextProps) {
    const { error } = nextProps
    if (this.props.error !== error) {
      if (error) {
        snackbarService.open({ error })
      } else {
        snackbarService.close()
      }
    }
  }
  render () {
    const { classes, className, children } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
      >
        <div className={classes.content}>
          {children}
        </div>
      </div>
    )
  }
}

ScreenContent.propTypes = {
  error: PropTypes.string
}
export default withStyles(styles)(ScreenContent)
