import React, { Component } from 'react'
import Input from 'material-ui/Input'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import styles from './styles'

class WrappedInput extends Component {
  render () {
    const { classes, className, value = '', disableUnderline, ...rest } = this.props
    return [
      <Input
        key={'input'}
        className={classes.container}
        ref={inputRef => { this.inputRef = inputRef }}
        fullWidth
        value={value}
        inputProps={{
          className: classNames({ [classes.cursor]: disableUnderline })
        }}
        disableUnderline={disableUnderline}
        {...rest}
      />,
      <div
        key={'fadingUnderline'}
        className={classNames(!disableUnderline ? classes.underlineShown : classes.underlineHidden)}
      />
    ]
  }
}

export default withStyles(styles)(WrappedInput)
