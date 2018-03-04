import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import Icon from '../Icon'
import * as propertyTypes from '../../platform/db/propertyTypes'

const propertyTypeToIconMap = {
  [propertyTypes.dataProperty]: 'storage',
  [propertyTypes.entityProperty]: 'timeline'
}

const PropertyTypeIcon = (props) => {
  const { value, ...rest } = props
  const type = propertyTypeToIconMap[value]
  if (type) {
    return (
      <Icon
        color={'primary'}
        {...rest}
      >
        {type}
      </Icon>
    )
  } else {
    return null
  }
}

export default PropertyTypeIcon
