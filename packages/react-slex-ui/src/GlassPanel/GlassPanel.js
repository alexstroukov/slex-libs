import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'

class GlassPanel extends PureComponent {
  render () {
    const { classes, className, children, clickable = true, onClick, ...rest } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
        onClick={onClick}
        {...rest}
      >
        {children}
        <div
          className={classNames(classes.overlay, {
            [classes.clickable]: clickable
          })}
          onClick={onClick}
        />
      </div>
    )
  }
}

GlassPanel.propTypes = {
  onClick: PropTypes.func,
  clickable: PropTypes.bool
}

export default withStyles(styles)(GlassPanel)
