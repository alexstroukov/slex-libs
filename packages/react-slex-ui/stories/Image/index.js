import React from 'react'
import { storiesOf } from '@storybook/react'
import PlaceholderExample from './PlaceholderExample'
// import { action } from '@storybook/addon-actions'

export default storiesOf('Image', module)
  .add('with placeholder', () => <PlaceholderExample />)
