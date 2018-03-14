import React, { PureComponent } from 'react'
import { GridTile, GridTileImage, GridTileLabel } from '../../src/Grid'

class LoadingExample extends PureComponent {
  state = {
    src: undefined,
    placeholderSrc: undefined,
    label: undefined
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        src: `https://picsum.photos/600/400?image=0`,
        placeholderSrc: `https://picsum.photos/30/20?image=0`,
        label: 'Tile label goes here'
      })
    }, 1000)
  }
  render () {
    const { src, placeholderSrc, label } = this.state
    return (
      <div style={{
        width: '66%'
      }}>
        <GridTile
          tileImageContent={(
            <GridTileImage
              src={src}
              placeholderSrc={placeholderSrc}
            />
          )}
          tileTextContent={(
            <GridTileLabel loading={!label} label={label} />
          )}
        />
      </div>
    )
  }
}
export default LoadingExample
