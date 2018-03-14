import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import GridTileLabelLoadingPlaceholder from '../GridTileLabelLoadingPlaceholder'
import Text from '../../Text'

class GridTileLabel extends PureComponent {
  state = {}
  componentDidMount () {
    this.setState({ fadeIn: true })
  }
  render () {
    const { classes, className, label, loading, dashed, ...rest } = this.props
    const { fadeIn } = this.state
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
        {...rest}
      >
        <div
          className={classNames(classes.textContainer)}
        >
          <Text
            noWrap
            className={classes.text}
          >
            {label}
          </Text>
        </div>
        <div
          className={classNames(classes.placeholderContainer, {
            [classes.hidden]: !loading || !fadeIn
          })}
        >
          <GridTileLabelLoadingPlaceholder
            dashed={dashed}
            {...rest}
          />
        </div>
      </div>
    )
  }
}

GridTileLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.any
}

export default withStyles(styles)(GridTileLabel)
