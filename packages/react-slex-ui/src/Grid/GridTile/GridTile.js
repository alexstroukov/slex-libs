import PropTypes from 'prop-types'
import React from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import Grid from 'material-ui/Grid'

const GridTile = (props) => {
  const { classes, className, style, tileImageContent, tileTextContent, xs = 12, sm = 6, md = 4, lg = 3, ...rest } = props
  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      className={classNames(
        classes.container,
        className
      )}
      style={style}
      {...rest}
    >
      <div className={classes.imageContainer}>
        <div className={classes.image}>
          {tileImageContent}
        </div>
      </div>
      {tileTextContent}
    </Grid>
  )
}

GridTile.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  tileImageContent: PropTypes.any.isRequired,
  tileTextContent: PropTypes.any.isRequired
}

export default withStyles(styles)(GridTile)
