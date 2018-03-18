import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import GridTileLabelLoadingPlaceholder from '../GridTileLabelLoadingPlaceholder'
import Text from '../../Text'

class GridTileLabel extends PureComponent {
  state = {
    loading: true
  }
  componentDidMount () {
    const { loading } = this.props
    if (!loading) {
      this.setState({
        loading: false
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    const { loading } = nextProps
    if (loading !== this.props.loading && loading !== this.loading) {
      this.loading = loading
      setTimeout(() => {
        this.setState({
          loading
        })
      }, 400)
    }
  }
  render () {
    const { classes, className, label, dashed, ...rest } = this.props
    const { loading } = this.state
    return (
      <div
        className={classNames(
          classes.container,
          className
        )}
        {...rest}
      >
        <div
          className={classNames(classes.textContainer, {
            [classes.hidden]: loading
          })}
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
            [classes.hidden]: !this.props.loading
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
