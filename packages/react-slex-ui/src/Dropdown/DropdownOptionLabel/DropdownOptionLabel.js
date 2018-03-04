import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

class DropdownOptionLabelWidget extends Component {
  render () {
    const { classes, loading, value = '' } = this.props
    if (!loading) {
      return value
    } else {
      return (
        <div className={classes.container}>
          <div key='one' className={classes.one} />
          <div key='two' className={classes.two} />
          <div key='three' className={classes.three} />
        </div>
      )
    }
  }
}

DropdownOptionLabelWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  value: PropTypes.string
}

export default withStyles(styles)(DropdownOptionLabelWidget)
