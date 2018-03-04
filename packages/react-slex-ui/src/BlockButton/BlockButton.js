import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

class BlockButton extends Component {
  render () {
    const { loading, disabled, children, onClick } = this.props
    return (
      <Button
        raised
        color='primary'
        disabled={disabled}
        onClick={onClick}
      >
        {loading
          ? [<div key={'children'} style={{ marginRight: 7 }}>{children}</div>, <CircularProgress color={disabled ? 'accent' : 'primary'} key='block-button-progress' size={20} />]
          : children
        }
      </Button>
    )
  }
}

BlockButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool
}

export default BlockButton
