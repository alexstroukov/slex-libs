import React, { PureComponent } from 'react'
import { HeaderButton, HeaderButtonLabel } from '../../src/Header'

class PlaceholderExample extends PureComponent {
  render () {
    return (
      <HeaderButton
        active
        label={(
          <HeaderButtonLabel
            loading
          />
        )}
      />
    )
  }
}
export default PlaceholderExample
