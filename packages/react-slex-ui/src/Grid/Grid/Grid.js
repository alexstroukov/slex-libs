import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import Grid from 'material-ui/Grid'

const WrappedGrid = (props) => {
  const { classes, className, style, gridTileContent, ...rest } = props
  return (
    <Grid
      container
      spacing={16}
      className={classNames(
          classes.container,
          className
        )}
      style={style}
      {...rest}
    >
      {gridTileContent}
    </Grid>
  )
}

WrappedGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  gridTileContent: PropTypes.any.isRequired
}

export default withStyles(styles)(WrappedGrid)
