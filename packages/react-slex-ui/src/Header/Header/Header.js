import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'

const Header = (props) => {
  const { classes, className, style, buttonContent, ...rest } = props
  return (
    <div
      className={classNames(
        classes.container,
        className
      )}
      style={style}
      {...rest}
    >
      <div className={classes.buttonContent}>
        {buttonContent}
      </div>
    </div>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  buttonContent: PropTypes.any.isRequired
}

export default withStyles(styles)(Header)
