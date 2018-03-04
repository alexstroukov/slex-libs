import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './styles'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'

class Toolbar extends PureComponent {
  renderChildren = () => {
    const { actionButtons } = this.props
    return _.chain([actionButtons])
      .flatten()
      .map((child, index) => {
        return (
          <div key={index}>{child}</div>
        )
      })
      .value()
  }
  render () {
    const { classes, className } = this.props
    return (
      <QueueAnim
        className={classNames(classes.container, className)}
        interval={[0, 0]}
        duration={[200, 0]}
        ease={['easeOutBack', 'easeInOutCirc']}
        type={['scale', 'alpha']}
        leaveReverse
      >
        {this.renderChildren()}
      </QueueAnim>
    )
  }
}

Toolbar.propTypes = {
  actionButtons: PropTypes.any
}

export default withStyles(styles)(Toolbar)
