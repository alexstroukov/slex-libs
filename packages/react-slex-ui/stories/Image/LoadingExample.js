import React, { PureComponent } from 'react'
import Image from '../../src/Image'

class LoadingExample extends PureComponent {
  state = {
    src: undefined,
    placeholderSrc: undefined
  }
  componentDidMount () {
    this.setState({
      src: `https://picsum.photos/${this._container.clientWidth * 10}/${this._container.clientHeight * 10}?image=0`,
      placeholderSrc: `https://picsum.photos/${this._container.clientWidth * 0.4}/${this._container.clientHeight * 0.4}?image=0`
    })
  }
  render () {
    const { src, placeholderSrc } = this.state
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
              placeholderSrc={placeholderSrc}
            />
          </div>
        </div>
      </div>
    )
  }
}
export default LoadingExample
