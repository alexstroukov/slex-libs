import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import classNames from 'classnames'
import GridTileImageLoadingPlaceholder from '../GridTileImageLoadingPlaceholder'
import Image from '../../Image'

class GridTileImage extends PureComponent {
  render () {
    const {
      classes,
      loading,
      dashed,
      className,
      src = 'https://placeimg.com/600/400/tech/grayscale',
      placeholderSrc = 'https://placeimg.com/6/4/tech/grayscale',
      ...rest
    } = this.props
    if (loading) {
      return (
        <div
          className={classNames(
            classes.container,
            className
          )}
          {...rest}
        >
          <GridTileImageLoadingPlaceholder dashed={dashed} {...rest} />
        </div>
      )
    } else {
      return (
        <div
          className={classNames(
            classes.container,
            className
          )}
          {...rest}
        >
          <Image
            src={src}
            placeholderSrc={placeholderSrc}
            className={classNames(
              classes.image,
              className
            )}
            {...rest}
          />
        </div>
      )
    }
  }
}

GridTileImage.propTypes = {
  src: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.any
}

export default withStyles(styles)(GridTileImage)

// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { withStyles } from 'material-ui/styles'
// import styles from './styles'
// import classNames from 'classnames'
// import GridTileLabelLoadingPlaceholder from '../GridTileLabelLoadingPlaceholder'

// class GridTileLabel extends PureComponent {
//   render () {
//     const { classes, className, children, loading, dashed, ...rest } = this.props
//     if (loading) {
//       return (
//         <div
//           className={classNames(
//             classes.container,
//             className
//           )}
//           {...rest}
//         >
//           <GridTileLabelLoadingPlaceholder dashed={dashed} {...rest} />
//         </div>
//       )
//     } else {
//       return (
//         <div
//           className={classNames(
//             classes.container,
//             className
//           )}
//           {...rest}
//         >
//           <div
//             className={classes.text}
//             noWrap
//           >
//             {children}
//           </div>
//         </div>
//       )
//     }
//   }
// }

// GridTileLabel.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   children: PropTypes.any
// }

// export default withStyles(styles)(GridTileLabel)
