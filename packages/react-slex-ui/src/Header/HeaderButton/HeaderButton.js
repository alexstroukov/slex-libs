import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ButtonBase from 'material-ui/ButtonBase'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'

class HeaderButton extends PureComponent {
  render () {
    const { classes, className, right, active, label, style, ...rest } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          {
            [classes.right]: right
          },
          className
        )}
        style={style}
      >
        <ButtonBase
          focusRipple
          className={classNames(
            classes.button,
            {
              [classes.active]: active
            }
          )}
          {...rest}
        >
          {label}
        </ButtonBase>
      </div>
    )
  }
}

HeaderButton.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  right: PropTypes.bool,
  active: PropTypes.bool,
  label: PropTypes.any
}

export default withStyles(styles)(HeaderButton)
