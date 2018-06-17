import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { FormControl, FormHelperText, FormLabel } from 'material-ui/Form'
import IndeterminateProgress from '../IndeterminateProgress'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

const formControlStyle = {
  paddingTop: '20px',
  width: '100%'
}
const formLabelStyle = {
  position: 'absolute',
  transform: 'translate(0, 1.5px) scale(0.75)',
  transformOrigin: 'top left'
}
const childrenContainerStyle = {
  marginTop: '16px'
}
const hideStyle = { opacity: 0 }
const showStyle = { opacity: 1 }

class FieldSet extends PureComponent {
  render () {
    const { classes, children, error, label } = this.props
    const formHelperTextStyle = !error ? hideStyle : showStyle
    return (
      <FormControl
        error={!!error}
        style={formControlStyle}
      >
        <FormLabel
          data-shrink={true}
          style={formLabelStyle}
        >
          {label}
        </FormLabel>
        <div
          style={childrenContainerStyle}
        >
          {children}
        </div>
        <FormHelperText
          id='input-text'
          className={classes.message}
          style={formHelperTextStyle}
        >
          {error}
        </FormHelperText>
      </FormControl>
    )
  }
}
// <div className={classes.container}>
//   <div className={classes.label}>{label}</div>
//   <div className={classes.field}>
//     {children}
//   </div>
//   <div className={classes.message} style={{ opacity: message == null ? 0 : 1 }}>
//     {message}
//   </div>
// </div>

FieldSet.propTypes = {
  label: PropTypes.string,
  loading: PropTypes.bool,
  message: PropTypes.string,
  children: PropTypes.any
}

export default withStyles(styles)(FieldSet)
