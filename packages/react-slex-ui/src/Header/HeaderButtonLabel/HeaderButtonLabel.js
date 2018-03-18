import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import HeaderButtonLabelLoadingPlaceholder from '../HeaderButtonLabelLoadingPlaceholder'
import Text from '../../Text'
import styles from './styles'
import classNames from 'classnames'

class HeaderButtonLabel extends PureComponent {
  state = {
    fadeIn: false,
    loading: true
  }
  componentDidMount () {
    const { loading } = this.props
    if (loading) {
      this.setState({
        fadeIn: true
      })
    } else {
      this.setState({
        fadeIn: true,
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
    const { fadeIn, loading } = this.state
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
            [classes.hidden]: loading || !fadeIn
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
            [classes.hidden]: !this.props.loading || !fadeIn
          })}
        >
          <HeaderButtonLabelLoadingPlaceholder
            dashed={dashed}
            {...rest}
          />
        </div>
      </div>
    )
  }
}

HeaderButtonLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  right: PropTypes.bool,
  active: PropTypes.bool,
  dashed: PropTypes.bool,
  label: PropTypes.string
}

export default withStyles(styles)(HeaderButtonLabel)
