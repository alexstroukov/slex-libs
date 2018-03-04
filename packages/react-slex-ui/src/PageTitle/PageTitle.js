import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import styles from './styles'
import PropTypes from 'prop-types'
import QueueAnim from 'rc-queue-anim'

class PageTitle extends PureComponent {
  render () {
    const { classes, className, toolbar, title } = this.props
    return (
      <QueueAnim
        className={classNames(
          classes.container,
          className
        )}
      >
        <div className={classes.title}>{title}</div>
        <div key='toolbar' className={classes.toolbar}>{toolbar}</div>
      </QueueAnim>
    )
  }
}

PageTitle.propTypes = {
  toolbar: PropTypes.any,
  title: PropTypes.any
}

export default withStyles(styles)(PageTitle)
