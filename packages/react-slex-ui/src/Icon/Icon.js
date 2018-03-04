import React from 'react'
import Icon from 'material-ui/Icon'

const WrappedIcon = (props) => {
  const { children, style = {}, color } = props
  return (
    <Icon
      style={{
        fontSize: '17px',
        alignItems: 'center',
        flex: '1',
        display: 'flex',
        ...style
      }}
      color={color}
    >
      {children}
    </Icon>
  )
}

export default WrappedIcon
