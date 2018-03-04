import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ButtonBase from 'material-ui/ButtonBase'
import Icon from 'material-ui/Icon'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'

class PageIcon extends PureComponent {
  render () {
    const { classes, className, loading, style, src = '/assets/svg/icon.svg', ...rest } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
        style={style}
      >
        <div className={classes.buttonWrapper}>
          <ButtonBase
            focusRipple
            className={classes.button}
            {...rest}
          >
            {loading
              ? <Icon
                style={{
                  color: '#939292'
                }}
              >
              insert_photo
            </Icon>
              : <img className={classes.image} src={src} />
            }
          </ButtonBase>
        </div>
      </div>
    )
  }
}

PageIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  src: PropTypes.string
}

export default withStyles(styles)(PageIcon)
