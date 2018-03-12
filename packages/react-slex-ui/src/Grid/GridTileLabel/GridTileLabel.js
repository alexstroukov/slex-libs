import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import GridTileLabelLoadingPlaceholder from '../GridTileLabelLoadingPlaceholder'

class GridTileLabel extends PureComponent {
  render () {
    const { classes, className, children, loading, dashed, ...rest } = this.props
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
        {...rest}
      >
        {loading
          ? <GridTileLabelLoadingPlaceholder dashed={dashed} {...rest} />
          : <div
            className={classes.text}
            noWrap
          >
            {children}
          </div>
        }
      </div>
    )
  }
}

GridTileLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any
}

export default withStyles(styles)(GridTileLabel)
