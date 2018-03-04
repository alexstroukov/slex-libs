import PropTypes from 'prop-types'
import React from 'react'
import Typography from 'material-ui/Typography'

const Text = (props) => {
  const { children, ...rest } = props
  return (
    <Typography {...rest}>
      {children}
    </Typography>
  )
}

export default Text
