import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import Snackbar from 'material-ui/Snackbar'
import classNames from 'classnames'
import styles from './styles'

const ScreenContent = (props) => {
  const { classes, className, error, children } = props
  return [
    <div
      key={'page-content'}
      className={classNames(
        classes.container,
        className
      )}
    >
      <div className={classes.content}>
        {children}
      </div>
    </div>,
    <Snackbar
      key={'editable-form-toast'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!error}
      SnackbarContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id='message-id'>{error}</span>}
    />
  ]
}

ScreenContent.propTypes = {
  error: PropTypes.string
}
export default withStyles(styles)(ScreenContent)
