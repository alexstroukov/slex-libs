import React from 'react'
import PropTypes from 'prop-types'
import FieldSet from '../../FieldSet'

const FormFieldSet = ({ children, label, loading, submitting, messages }) => {
  return (
    <FieldSet label={label} loading={loading && !submitting} message={messages && messages[0]}>
      {children}
    </FieldSet>
  )
}

FormFieldSet.propTypes = {
  label: PropTypes.string,
  loading: PropTypes.bool,
  submitting: PropTypes.bool,
  messages: PropTypes.array
}

export default FormFieldSet
