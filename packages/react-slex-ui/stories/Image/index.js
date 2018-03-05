import React from 'react'
import { storiesOf } from '@storybook/react'
import PlaceholderExample from './PlaceholderExample'
import LoadingExample from './LoadingExample'
import StandardExample from './StandardExample'

export default storiesOf('Image', module)
  .add('standard example', () => <StandardExample />)
  .add('blurred loading example', () => <LoadingExample />)
  .add('placeholder example', () => <PlaceholderExample />)
