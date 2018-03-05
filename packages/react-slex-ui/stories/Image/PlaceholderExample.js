import React, { PureComponent } from 'react'
// import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import Image from '../../src/Image'

class PlaceholderExample extends PureComponent {
  render () {
    const src = 'https://picsum.photos/600/400?image=0'
    const placeholderSrc = 'https://picsum.photos/60/40?image=0'
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
            <Image
              src={src}
              placeholderSrc={placeholderSrc}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default PlaceholderExample
