import React, { PureComponent } from 'react'
import Image from '../../src/Image'

class PlaceholderExample extends PureComponent {
  render () {
    return (
      <div style={{
        width: 200,
        position: 'relative'
      }}>
        <div style={{
          paddingTop: '66%'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}>
            <Image />
          </div>
        </div>
      </div>
    )
  }
}
export default PlaceholderExample
