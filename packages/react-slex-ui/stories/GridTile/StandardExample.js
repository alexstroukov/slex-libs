import React, { PureComponent } from 'react'
import Image from '../../src/Image'

class StandardExample extends PureComponent {
  state = {
    src: undefined
  }
  componentDidMount () {
    this.setState({
      src: `https://picsum.photos/${this._container.clientWidth}/${this._container.clientHeight}?image=0`
    })
  }
  render () {
    const { src } = this.state
    return (
      <div style={{
        width: 200,
        position: 'relative'
      }}>
        <div style={{
          paddingTop: '66%'
        }}>
          <div
            ref={container => { this._container = container }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
          >
            <Image
              src={src}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default StandardExample
