import React from 'react'
import FieldSet from '../FieldSet'
import Dropdown from '../../Dropdown'

const fullWidthStyle = { width: '100%' }
const FormDropdown = ({
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
  ...rest
}) => {
  return (
    <FieldSet label={label} loading={loading} submitting={submitting} messages={messages}>
      <Dropdown
        displayValueFormatter={displayValueFormatter}
        value={value}
        options={options}
        readOnly={!editing || submitting}
        disableUnderline={!editing}
        key={formName + fieldName}
        loadData={loadData}
        style={fullWidthStyle}
        changeValue={changeValue}
        placeholder={placeholder}
        loading={loadingOptions}
        {...rest}
      />
    </FieldSet>
  )
}

export default FormDropdown
