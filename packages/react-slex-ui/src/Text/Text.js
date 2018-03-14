import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Typography from 'material-ui/Typography'

class Text extends PureComponent {
  render () {
    const { children, ...rest } = this.props
    return (
      <Typography
        {...rest}
      >
        {children}
      </Typography>
    )
  }
}

export default Text
