import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import styles from './styles'
import Text from '../Text'

class Title extends PureComponent {
  render () {
    const { classes, className, title, ...rest } = this.props
    return (
      <Text
        className={classNames(classes.container, className)}
        type={'headline'}
        {...rest}
      >
        {title}
      </Text>
    )
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired
}

export default withStyles(styles)(Title)
