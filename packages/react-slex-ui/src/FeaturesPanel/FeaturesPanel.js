import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

class FeaturesPanel extends Component {
  render () {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>
            Features
          </div>
        </div>
        <div className={classes.titleContainer}>
          Icon
        </div>
      </div>
    )
  }
}

FeaturesPanel.propTypes = {

}

export default withStyles(styles)(FeaturesPanel)
