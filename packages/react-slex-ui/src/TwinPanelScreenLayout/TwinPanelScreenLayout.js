import PropTypes from 'prop-types'
import React from 'react'
import PanelScreenLayout from '../PanelScreenLayout'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

const TwinPanelScreenLayout = (props) => {
  const { classes, titleContent, toolbarContent, leftContent, rightContent, bottomContent } = props
  return (
    <PanelScreenLayout
      titleContent={titleContent}
      toolbarContent={toolbarContent}
      centerContent={(
        <div className={classes.centerContent}>
          <div className={classes.leftContent}>
            {leftContent}
          </div>
          <div style={{ width: '24px' }} />
          <div className={classes.rightContent}>
            {rightContent}
          </div>
        </div>
      )}
      bottomContent={bottomContent}
    />
  )
}

TwinPanelScreenLayout.propTypes = {
  titleContent: PropTypes.any.isRequired,
  toolbarContent: PropTypes.any.isRequired,
  leftContent: PropTypes.any.isRequired,
  rightContent: PropTypes.any.isRequired,
  bottomContent: PropTypes.any.isRequired
}

export default withStyles(styles)(TwinPanelScreenLayout)
