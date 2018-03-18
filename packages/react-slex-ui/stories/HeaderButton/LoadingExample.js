import React, { PureComponent } from 'react'
import { HeaderButton, HeaderButtonLabel } from '../../src/Header'

class LoadingExample extends PureComponent {
  state = {
    label: undefined
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        label: 'Home and away'
      })
    }, 500)
  }
  render () {
    const { label } = this.state
    return (
      <HeaderButton
        active
        label={(
          <HeaderButtonLabel
            loading={!label}
            label={label}
          />
        )}
      />
    )
  }
}
export default LoadingExample
