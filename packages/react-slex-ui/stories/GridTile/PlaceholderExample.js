import React, { PureComponent } from 'react'
import { GridTile, GridTileImage, GridTileLabel } from '../../src/Grid'

class PlaceholderExample extends PureComponent {
  render () {
    return (
      <div style={{
        width: '66%'
      }}>
        <GridTile
          tileImageContent={(
            <GridTileImage loading />
          )}
          tileTextContent={(
            <GridTileLabel loading />
          )}
        />
      </div>
    )
  }
}
export default PlaceholderExample
