import React, { Component } from 'react'

const Editable = WrappedComponent => class EditableWrapper extends Component {
  state = {
    editing: !!this.props.editing,
    submitting: !!this.props.submitting
  }
  _isEvent = (value) => {
    return value && value.target
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.submitting !== !!nextProps.submitting) {
      if (this.state.submitting) {
        if (nextProps.submitError) {
          this.toggleSubmit(nextProps.submitting)
        } else {
          this.cancelEdit(nextProps.submitting)
        }
      } else {
        this.toggleSubmit(nextProps.submitting)
      }
    }
  }
  componentWillMount () {
    this._cancelEdit = submitting => {
      this.setState({ editing: false, submitting })
    }
    this._toggleEdit = editing => {
      this.setState({ editing })
    }
    this._toggleSubmit = submitting => {
      this.setState({ submitting })
    }
  }
  componentWillUnmount () {
    this._cancelEdit = undefined
    this._toggleEdit = undefined
    this._toggleSubmit = undefined
  }
  cancelEdit = (submitting = false) => {
    this._cancelEdit && this._cancelEdit(this._isEvent(submitting) ? !this.state.submitting : submitting)
  }
  toggleEdit = (editing = !this.state.editing) => {
    this._toggleEdit && this._toggleEdit(this._isEvent(editing) ? !this.state.editing : editing)
  }
  toggleSubmit = (submitting = !this.state.submitting) => {
    this._toggleSubmit && this._toggleSubmit(this._isEvent(submitting) ? !this.state.submitting : submitting)
  }
  render () {
    const { editing } = this.state
    return <WrappedComponent {...this.props} editing={editing} toggleEdit={this.toggleEdit} />
  }
}

export default Editable
