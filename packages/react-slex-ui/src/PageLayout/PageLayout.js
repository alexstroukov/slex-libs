import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Motion, spring } from 'react-motion'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import IndeterminateProgress from '../IndeterminateProgress'

const defaultStyle = { opacity: 0 }

class PageLayout extends PureComponent {
  static fullHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  state = {
    showSidebar: false
  }
  componentDidMount () {
    this._setShowSidebar = ({ showSidebar }) => this.setState({ showSidebar })
    setTimeout(() => {
      requestAnimationFrame(() => {
        this._setShowSidebar && this._setShowSidebar({ showSidebar: !this.state.showSidebar })
      })
    }, 0)
  }
  componentWillUnmount () {
    this._setShowSidebar = undefined
  }
  render () {
    const { fullScreen = true, classes, className, iconContent, headerContent, pageContent, sidebarContent, loading = false, ...rest } = this.props
    return (
      <div
        className={classNames(classes.container, className, {
          [classes.containerFullHeight]: fullScreen
        })}
        {...rest}
      >
        <div className={classes.verticalContainer}>
          <div className={classes.horizontalContainer}>
            {iconContent &&
              <div className={classes.iconContainer}>
                {iconContent}
              </div>
            }
            {headerContent &&
              <div className={classes.headerContainer}>
                {React.cloneElement(headerContent)}
              </div>
            }
          </div>
          <div className={classes.horizontalContainer} style={fullScreen ? { minHeight: PageLayout.fullHeight - 60 } : {}}>
            <div className={classes.verticalContainer}>
              {pageContent && React.cloneElement(pageContent, { className: classes.pageContainer })}
            </div>
            <Motion
              defaultStyle={defaultStyle}
              style={{
                opacity: spring(sidebarContent && this.state.showSidebar ? 1 : 0, { stiffness: 120, damping: 17 })
              }}>
              {({ opacity }) => {
                const fullScreenStyle = fullScreen ? { minHeight: PageLayout.fullHeight - 60 } : {}
                const visiblityStyle = opacity === 0 ? { transform: `scale(0)` } : {}
                return (
                  <div
                    style={{ ...visiblityStyle, ...fullScreenStyle }}
                    className={classes.sidebarContainer}
                  >
                    <div
                      className={classes.sidebarContent}
                      style={{ opacity }}>
                      {sidebarContent && React.cloneElement(sidebarContent)}
                    </div>
                  </div>
                )
              }}
            </Motion>
          </div>
          <div className={classes.routeProgressHorizontal}>
            <IndeterminateProgress show={loading} size={2} />
          </div>
        </div>
      </div>
    )
  }
}

PageLayout.propTypes = {
  fullScreen: PropTypes.bool,
  loading: PropTypes.bool,
  transition: PropTypes.oneOf(['left', 'none', 'fade'])
}

export default withStyles(styles)(PageLayout)
