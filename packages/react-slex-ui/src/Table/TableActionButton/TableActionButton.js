import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import RoundButton from '../../RoundButton'
import Tooltip from 'material-ui/Tooltip'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

class TableActionButton extends PureComponent {
  render () {
    const { classes, tooltip, icon, onClick, disabled } = this.props
    return (
      <div className={classes.container}>
        <Tooltip placement='top' title={tooltip}>
          <RoundButton
            size={'small'}
            color={'primary'}
            aria-label={tooltip}
            onClick={onClick}
            icon={icon}
            disabled={disabled}
          />
        </Tooltip>
      </div>
    )
  }
}

TableActionButton.propTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  tooltip: PropTypes.string
}

export default withStyles(styles)(TableActionButton)
