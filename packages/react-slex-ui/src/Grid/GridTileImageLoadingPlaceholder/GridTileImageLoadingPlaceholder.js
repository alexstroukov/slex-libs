import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import Image from '../../Image'

class GridTileLabelLoadingPlaceholder extends PureComponent {
  render () {
    const { classes, className, dashed, ...rest } = this.props
    return (
      <div className={classNames(classes.container, className)} {...rest}>
        {dashed
          ? <div className={classes.dashed}>
            <Image
              className={classes.container}
            />
          </div>
          : <Image
            className={classes.container}
          />
        }
      </div>
    )
  }
}
export default withStyles(styles)(GridTileLabelLoadingPlaceholder)
