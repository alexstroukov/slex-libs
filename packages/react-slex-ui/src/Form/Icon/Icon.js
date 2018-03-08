import React from 'react'
import FieldSet from '../FieldSet'
import Icon from '../../Icon'

const FormIcon = ({
  formName,
  fieldName,
  label,
  placeholder,
  value,
  changeValue,
  loading,
  loadingOptions,
  options,
  displayValueFormatter,
  loadData,
  submitting,
  touched,
  messages,
  editing = true,
  initialValue,
  meta,
  type,
  children,
  ...rest
}) => {
  return (
    <FieldSet label={label} loading={loading} submitting={submitting} messages={messages}>
      <Icon
        style={{
          height: '1.1875em',
          paddingTop: '6px',
          paddingBottom: '6px'
        }}
        {...rest}
      >
        {type || children}
      </Icon>
    </FieldSet>
  )
}

export default FormIcon
