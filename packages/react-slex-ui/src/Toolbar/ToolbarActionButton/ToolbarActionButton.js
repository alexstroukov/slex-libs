import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import RoundButton from '../../RoundButton'
import _ from 'lodash'

class ToolbarActionButton extends PureComponent {
  render () {
    const { classes, loading, tooltip, icon, onClick, disabled = false, show = true } = this.props
    if (show) {
      return (
        <div className={classes.container}>
          <RoundButton
            aria-label={tooltip}
            disabled={disabled}
            loading={loading}
            icon={icon}
            onClick={disabled ? _.noop : onClick}
          />
        </div>
      )
    } else {
      return null
    }
  }
}
ToolbarActionButton.propTypes = {
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  tooltip: PropTypes.string
}

export default withStyles(styles)(ToolbarActionButton)
