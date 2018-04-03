import PropTypes from 'prop-types'
import _ from 'lodash'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import Icon from 'material-ui/Icon'
import styles from './styles'
import classNames from 'classnames'
import StackBlur from 'stackblur-canvas'

class WrappedImage extends PureComponent {
  state = {
    loading: true,
    src: this.props.src,
    loadingPlaceholder: true,
    placeholderSrc: this.props.placeholderSrc
  }
  initial = true
  static cache = {}
  static loadImage = _.memoize(
    src => new Promise((resolve, reject) => {
      const image = new Image()
      image.crossOrigin = 'Anonymous'
      image.onload = function () {
        WrappedImage.cache[src] = image
        resolve(image)
      }
      image.src = src
    })
  )
  loadImage = src => {
    this.setState({ loading: true, src })
    return WrappedImage
      .loadImage(src)
      .then(image => {
        if (this.initial) {
          this.initial = false
          setTimeout(() => {
            this.setState({ loading: false })
          }, 1000)
        } else {
          this.setState({ loading: false })
        }
      })
      .catch(error => {
        this.setState({ loading: false })
      })
  }
  loadPlaceholder = placeholderSrc => {
    this.setState({ loadingPlaceholder: true, placeholderSrc })
    return WrappedImage
      .loadImage(placeholderSrc)
      .then(placeholderImage => {
        this.setState({ loadingPlaceholder: false }, () => {
          this.drawPlaceholderImage(placeholderImage)
        })
      })
      .catch(error => {
        this.setState({ loadingPlaceholder: false })
      })
  }
  componentDidMount () {
    if (this.state.src) {
      this.loadImage(this.state.src)
    }
    if (this.state.placeholderSrc) {
      this.loadPlaceholder(this.state.placeholderSrc)
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.src !== this.props.src) {
      if (nextProps.src) {
        this.loadImage(nextProps.src)
      }
    }
    if (nextProps.placeholderSrc !== this.props.placeholderSrc) {
      if (nextProps.placeholderSrc) {
        this.loadPlaceholder(nextProps.placeholderSrc)
      }
    }
  }
  drawPlaceholderImage = (image) => {
    const context = this._canvas && this._canvas.getContext('2d')
    const width = this._container
      ? this._container.clientWidth
      : 0
    const height = this._container
      ? this._container.clientHeight
      : 0
    if (context) {
      context.drawImage(image, 0, 0, width, height)
      context.width = width
      context.height = height
      StackBlur.canvasRGB(this._canvas, 0, 0, width, height, 16)
    }
  }
  render () {
    const { classes, className, src: propsSrc, placeholderSrc: propsPlaceholderSrc, placeholder = true, ...rest } = this.props
    const { src, placeholderSrc, loading, loadingPlaceholder } = this.state
    const width = this._container
      ? this._container.clientWidth
      : 0
    const height = this._container
      ? this._container.clientHeight
      : 0
    return (
      <div
        ref={container => { this._container = container }}
        className={classNames(
          classes.container,
          className
        )}
      >
        <div
          className={classNames(classes.placeholder)}
          {...rest}
        >
          {src || placeholderSrc || !placeholder
            ? null
            : <Icon
              className={classes.icon}
            >
              insert_photo
            </Icon>
          }
        </div>
        {this._container && <canvas
          ref={canvas => { this._canvas = canvas }}
          width={width}
          height={height}
          className={classNames(classes.placeholderImage, {
            [classes.hidden]: this.initial
          })}
          src={placeholderSrc}
          {...rest}
        />}
        <img
          className={classNames(classes.image, {
            [classes.hidden]: loading || (loadingPlaceholder && placeholderSrc)
          })}
          src={src}
          {...rest}
        />
      </div>
    )
  }
}

WrappedImage.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
}

export default withStyles(styles)(WrappedImage)
