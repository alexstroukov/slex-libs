import React, { PureComponent } from 'react'
import { HeaderButton, HeaderButtonLabel } from '../../src/Header'

class StandardExample extends PureComponent {
  render () {
    return (
      <HeaderButton
        active
        label={(
          <HeaderButtonLabel
            label={'Home and away'}
          />
        )}
      />
    )
  }
}
export default StandardExample
