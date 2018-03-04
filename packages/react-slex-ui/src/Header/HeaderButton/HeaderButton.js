import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ButtonBase from 'material-ui/ButtonBase'
import { withStyles } from 'material-ui/styles'
import HeaderButtonLoadingPlaceholder from '../HeaderButtonLoadingPlaceholder'
import styles from './styles'
import classNames from 'classnames'

class HeaderButton extends PureComponent {
  render () {
    const { classes, className, right, active, dashed, label, style, loading, ...rest } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          {
            [classes.right]: right,
            [classes.active]: active
          },
          className
        )}
        style={style}
      >
        <ButtonBase
          focusRipple
          className={classes.button}
          {...rest}
        >
          {loading
            ? <HeaderButtonLoadingPlaceholder dashed={dashed} />
            : <span className={classes.label}>{label}</span>
          }
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
  dashed: PropTypes.bool,
  label: PropTypes.string
}

export default withStyles(styles)(HeaderButton)
