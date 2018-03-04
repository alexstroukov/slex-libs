import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'
import _ from 'lodash'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'

class TableActionRow extends PureComponent {
  renderChildren = () => {
    const { actionButtons, show = true } = this.props
    if (show) {
      return _.chain(actionButtons)
        .map((child, index) => {
          return (
            <div key={index}>{child}</div>
          )
        })
        .value()
    } else {
      return null
    }
  }

  render () {
    const { classes } = this.props
    return (
      <QueueAnim
        className={classes.container}
        interval={[0, 0]}
        duration={[200, 200]}
        ease={['easeOutBack', 'easeInOutCirc']}
        type={['scale', 'alpha']}
        leaveReverse
      >
        {this.renderChildren()}
      </QueueAnim>
    )
  }
}

TableActionRow.propTypes = {
  show: PropTypes.bool,
  actionButtons: PropTypes.any
}

export default withStyles(styles)(TableActionRow)
