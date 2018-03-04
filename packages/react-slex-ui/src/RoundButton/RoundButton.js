import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Button from 'material-ui/Button'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import Icon from 'material-ui/Icon'
import styles from './styles'

class RoundButton extends PureComponent {
  render () {
    const { classes, loading, disabled, icon, onClick, className, color = 'primary', size = 'medium', ...rest } = this.props
    return (
      <Button
        fab
        className={
          classNames(
            {
              [classes.containerSmall]: size === 'small',
              [classes.containerMedium]: size === 'medium'
            },
            className
          )
        }
        color={color}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {loading
          ? <CircularProgress
            key='round-button-progress'
            color='accent'
            size={20}
          />
          : <Icon
            className={
              classNames(
                {
                  [classes.iconSmall]: size === 'small',
                  [classes.iconMedium]: size === 'medium'
                }
              )
            }
          >
            {icon}
          </Icon>
        }
      </Button>
    )
  }
}

RoundButton.propTypes = {
  size: PropTypes.oneOf(['medium', 'small']),
  icon: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}

export default withStyles(styles)(RoundButton)
