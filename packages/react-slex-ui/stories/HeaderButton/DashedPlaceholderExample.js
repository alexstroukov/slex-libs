import React, { PureComponent } from 'react'
import { HeaderButton, HeaderButtonLabel } from '../../src/Header'

class PlaceholderExample extends PureComponent {
  render () {
    return (
      <HeaderButton
        label={(
          <HeaderButtonLabel
            loading
            dashed
          />
        )}
      />
    )
  }
}
export default PlaceholderExample
