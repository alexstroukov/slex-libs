import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

class WelcomePanel extends Component {
  render () {
    const { classes, className, ...rest } = this.props
    return (
      <div className={classNames(classes.container, className)} {...rest}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>
            One thing
          </div>
          <div className={classes.subtitle}>
            For all your things
          </div>
        </div>
        <div className={classes.titleContainer}>
          Icon
        </div>
      </div>
    )
  }
}

WelcomePanel.propTypes = {

}

export default withStyles(styles)(WelcomePanel)
