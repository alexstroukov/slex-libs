import React from 'react'
import { storiesOf } from '@storybook/react'
import PlaceholderExample from './PlaceholderExample'
import DashedPlaceholderExample from './DashedPlaceholderExample'
import LoadingExample from './LoadingExample'
// import StandardExample from './StandardExample'
import { MuiThemeProvider } from 'material-ui/styles'
import theme from '../theme'

export default storiesOf('GridTile', module)
  // .add('standard example', () => (
  //   <MuiThemeProvider theme={theme}>
  //     <StandardExample />
  //   </MuiThemeProvider>
  // ))
  .add('blurred loading example', () => (
    <MuiThemeProvider theme={theme}>
      <LoadingExample />
    </MuiThemeProvider>
  ))
  .add('placeholder example', () => (
    <MuiThemeProvider theme={theme}>
      <PlaceholderExample />
    </MuiThemeProvider>
  ))
  .add('dashed placeholder example', () => (
    <MuiThemeProvider theme={theme}>
      <DashedPlaceholderExample />
    </MuiThemeProvider>
  ))
