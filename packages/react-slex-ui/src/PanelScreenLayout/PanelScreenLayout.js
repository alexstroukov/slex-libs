import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Motion, spring } from 'react-motion'
import { withStyles } from 'material-ui/styles'
import PageTitle from '../PageTitle'
import styles from './styles'

const sidebarContentDefaultSyle = { width: 200 }
const mainContentDefaultSyle = { translateX: 0 }

class PanelScreenLayout extends PureComponent {
  render () {
    const { classes, titleContent, toolbarContent, centerContent, sidebarContent, bottomContent } = this.props
    return (
      <div className={classes.container}>
        <Motion
          className={classes.mainContent}
          defaultStyle={mainContentDefaultSyle}
          style={{
            translateX: spring(sidebarContent ? -200 : 0, { stiffness: 120, damping: 17 })
          }}>
          {({ translateX }) => {
            return (
              <div style={{ width: '100%', transform: `translateX(${translateX}px)` }}>
                <PageTitle
                  className={classes.topContent}
                  title={titleContent}
                  toolbar={toolbarContent}
                />
                <div className={classes.centerContent}>
                  {centerContent}
                </div>
                <div className={classes.bottomContent}>
                  {bottomContent}
                </div>
              </div>
            )
          }}
        </Motion>
        <Motion
          defaultStyle={sidebarContentDefaultSyle}
          style={{
            width: spring(sidebarContent ? 400 : 200, { stiffness: 120, damping: 17 })
          }}>
          {interpolatingStyle => {
            return (
              <div
                className={classNames(
                  classes.sidebarContent
                )}
                style={interpolatingStyle}
              >
                {sidebarContent}
              </div>
            )
          }}
        </Motion>
      </div>
    )
  }
}

PanelScreenLayout.propTypes = {
  titleContent: PropTypes.any,
  toolbarContent: PropTypes.any,
  centerContent: PropTypes.any,
  bottomContent: PropTypes.any
}

export default withStyles(styles)(PanelScreenLayout)
