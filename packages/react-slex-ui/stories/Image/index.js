import React from 'react'
import { storiesOf } from '@storybook/react'
import PlaceholderExample from './PlaceholderExample'
import LoadingExample from './LoadingExample'

export default storiesOf('Image', module)
  .add('blurred loading example', () => <LoadingExample />)
  .add('placeholder example', () => <PlaceholderExample />)
