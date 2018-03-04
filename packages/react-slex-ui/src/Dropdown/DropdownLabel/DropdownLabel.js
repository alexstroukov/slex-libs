import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles'
import { withStyles } from 'material-ui/styles'
import Input, { InputAdornment } from 'material-ui/Input'
import Icon from 'material-ui/Icon'
import classNames from 'classnames'

const DropdownLabel = (props) => {
  const { classes, value = '', className, ...rest } = props
  return (
    <Input
      value={value}
      {...rest}
      fullWidth
      className={classNames(classes.container, className)}
      endAdornment={!rest.disableUnderline && (
        <InputAdornment position='end'>
          <Icon className={classes.icon}>arrow_drop_down</Icon>
        </InputAdornment>
      )}
    />
  )
}

DropdownLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.string
}

export default withStyles(styles)(DropdownLabel)
