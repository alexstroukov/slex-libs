import PropTypes from 'prop-types'
import _ from 'lodash'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import styles from './styles'
import classNames from 'classnames'

class WrappedImage extends PureComponent {
  state = {
    loading: true,
    src: this.props.src,
    loadingPlaceholder: true,
    placeholderSrc: this.props.placeholderSrc
  }
  static cache = {}
  static loadImage = _.memoize(
    src => new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function () {
        WrappedImage.cache[src] = true
        resolve(src)
      }
      img.src = src
    })
  )
  loadImage = src => {
    this.setState({ loading: true, src })
    return WrappedImage
      .loadImage(src)
      .then(src => {
        this.setState({ loading: false })
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  }
  loadPlaceholder = placeholderSrc => {
    this.setState({ loadingPlaceholder: true, placeholderSrc })
    return WrappedImage
      .loadImage(placeholderSrc)
      .then(placeholderSrc => {
        this.setState({ loadingPlaceholder: false })
      })
      .catch(error => {
        this.setState({ loadingPlaceholder: false })
      })
  }
  componentWillMount () {
    if (this.state.src) {
      // TODO: remove forced loading
      setTimeout(() => {
        this.loadImage(this.state.src)
      }, 400)
    }
    if (this.state.placeholderSrc) {
      this.loadPlaceholder(this.state.placeholderSrc)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.src !== this.props.src) {
      if (nextProps.src) {
        setTimeout(() => {
          this.loadImage(nextProps.src)
        }, 1400)
      }
    }
    if (nextProps.placeholderSrc !== this.props.placeholderSrc) {
      if (nextProps.placeholderSrc) {
        this.loadPlaceholder(nextProps.placeholderSrc)
      }
    }
  }
  render () {
    const { classes, className, ...rest } = this.props
    const { src, placeholderSrc, loading, loadingPlaceholder } = this.state
    if (!loading) {
      return (
        <img
          className={classNames(
            classes.container,
            className
          )}
          src={src}
          {...rest}
        />
      )
    } else if (!loadingPlaceholder) {
      return (
        <img
          className={classNames(
            classes.container,
            className
          )}
          src={placeholderSrc}
          {...rest}
        />
      )
    } else {
      return (
        <div
          className={classNames(
            classes.container,
            classes.placeholder,
            className
          )}
          {...rest}
        >
          <Icon
            className={classes.icon}
          >
            insert_photo
          </Icon>
        </div>
      )
    }
  }
}

WrappedImage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default withStyles(styles)(WrappedImage)
