import React from 'react'
import FieldSet from '../FieldSet'
import Input from '../../Input'

const FormInput = ({
  formName,
  fieldName,
  label,
  placeholder,
  value,
  changeValue,
  loading,
  submitting,
  touched,
  messages,
  editing = true,
  initialValue,
  meta,
  type,
  ...rest
}) => {
  return (
    <FieldSet label={label} loading={loading} submitting={submitting} messages={messages}>
      <Input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={event => changeValue(event.target.value)}
        readOnly={!editing || submitting}
        disableUnderline={!editing}
        {...rest}
      />
    </FieldSet>
  )
}

export default FormInput
