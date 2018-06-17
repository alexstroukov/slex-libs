import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Menu, { MenuItem } from 'material-ui/Menu'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import DropdownLabel from '../DropdownLabel'
import styles from './styles'

class Dropdown extends Component {
  id = 'dropdown-menu' + _.uniqueId()
  state = {
    anchorEl: null,
    open: false
  }

  handleClick = event => {
    const { loadData, readOnly } = this.props
    if (!readOnly) {
      loadData && loadData()
      this.setState({ open: true, anchorEl: event.currentTarget })
    }
  }

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  handleChange = option => {
    const { onChange } = this.props
    this.handleRequestClose()
    onChange(option)
  }

  renderOption = (option, index) => {
    const { value, displayValueFormatter, optionValueFormatter = displayValueFormatter } = this.props
    const isHighlighted = value === option
    return (
      <MenuItem
        key={`dropdown_option_${index}`}
        selected={isHighlighted}
        onClick={_.partial(this.handleChange, option)}
        component={'div'}
      >
        {optionValueFormatter(option)}
      </MenuItem>
    )
  }

  renderOptions = () => {
    const { options } = this.props
    return _.chain(options)
      .map(this.renderOption)
      .value()
  }

  renderInput = (dropdownLabelProps) => {
    const { renderInput, disableUnderline } = this.props
    if (renderInput) {
      return renderInput(dropdownLabelProps)
    } else {
      return (
        <DropdownLabel
          disableUnderline={disableUnderline}
          {...dropdownLabelProps}
        />
      )
    }
  }

  render () {
    const { classes, placeholder, value, displayValueFormatter, disableUnderline } = this.props
    const { open, anchorEl } = this.state
    const dropdownLabelProps = {
      value: displayValueFormatter(value) || '',
      readOnly: true,
      placeholder,
      onChange: this.handleChange,
      onBlur: this.onBlur
    }
    return [
      <div
        role='button'
        className={classes.container}
        key='dropdown-button'
        onClick={this.handleClick}>
        {this.renderInput(dropdownLabelProps)}
        <div className={classNames(classes.overlay, {
          [classes.cursor]: !disableUnderline
        })} />
      </div>,
      <div
        key={'fadingUnderline'}
        className={classNames(!disableUnderline ? classes.underlineShown : classes.underlineHidden)}
      />,
      <Menu
        id={this.id}
        key={this.id}
        anchorEl={anchorEl}
        open={open}
        onClose={this.handleRequestClose}
      >
        {this.renderOptions()}
      </Menu>
    ]
  }
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired
}

Dropdown.defaultProps = {
  emptyValue: undefined,
  loadData: _.noop,
  displayValueFormatter: option => _.isObject(option) ? option.guid || option.id || option.key : option
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,

  emptyValue: PropTypes.oneOf([null, undefined]),

  renderInput: PropTypes.func,
  displayValueFormatter: PropTypes.func,
  optionValueFormatter: PropTypes.func,
  options: PropTypes.array,
  hasMore: PropTypes.bool,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  disableUnderline: PropTypes.bool,
  loadData: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default withStyles(styles)(Dropdown)
