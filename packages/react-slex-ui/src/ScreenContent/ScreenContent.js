import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { SwapTransition } from '../Transition'
import { snackbarService } from '../Snackbar'
import { CircularProgress } from 'material-ui/Progress'
import classNames from 'classnames'
import styles from './styles'

const swapContentStyle = { display: 'flex', flex: 1 }
class ScreenContent extends PureComponent {
  componentWillReceiveProps (nextProps) {
    const { loadError, submitError } = nextProps
    if (!nextProps.loadError && !nextProps.submitError) {
      snackbarService.close()
    } else {
      snackbarService.open({ error: submitError || loadError })
    }
  }
  renderLoader = () => {
    const { classes } = this.props
    return (
      <div
        key={'a'}
        className={classes.loaderContainer}
      >
        <CircularProgress className={classes.loader} />
      </div>
    )
  }
  renderChildren = () => {
    const { classes, children } = this.props
    return (
      <div key={'b'} className={classes.childrenContainer}>
        {children}
      </div>
    )
  }
  renderContent = () => {
    const { classes, loading } = this.props
    return (
      <SwapTransition
        className={classes.content}
        style={swapContentStyle}
        contentName={loading ? '-a' : '-b'}
        transition={'fade'}>
        {loading
          ? this.renderLoader()
          : this.renderChildren()
        }
      </SwapTransition>
    )
  }
  render () {
    const { classes, className } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
      >
        {this.renderContent()}
      </div>
    )
  }
}

ScreenContent.propTypes = {
  loading: PropTypes.bool,
  loadError: PropTypes.string,
  submitError: PropTypes.string
}
export default withStyles(styles)(ScreenContent)
