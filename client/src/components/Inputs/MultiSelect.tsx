/* eslint-disable */
import React from 'react'
import {
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
  ListItemText,
  FormHelperText,
} from '@mui/material'
import { Controller, ControllerProps, FieldError } from 'react-hook-form'

export type SelectElementProps = SelectProps & {
  validation?: ControllerProps['rules']
  options?: any[]
  valueKey?: string
  labelKey?: string
  parseError?: (error: FieldError) => string
  onChange?: (value: any) => void
}

const MultiSelect: React.FC<SelectElementProps> = ({
  name,
  label,
  required,
  valueKey = 'value',
  labelKey = 'label',
  options = [],
  parseError,
  ...rest
}) => {
  return (
    <Controller
      name={name as any}
      render={({
        field: { onBlur, onChange, value },
        fieldState: { invalid, error },
      }) => {
        const helperText = error ? typeof parseError === 'function' ? parseError(error as any) : error.message : ''

        return (
          <FormControl fullWidth>
            {label && <InputLabel>{label}</InputLabel>}

            <Select
              {...rest}
              value={value || ''}
              label={label ? `${label} ${required ? '*' : ''} ` : ''}
              onBlur={onBlur}
              onChange={(event) => onChange(event.target.value)}
              multiple
            >
              {options.map((option, index) => (
                <MenuItem key={index} value={option[valueKey]}>
                  <Checkbox
                    color="primary"
                    checked={value.indexOf(option[valueKey]) > -1}
                  />
                  <ListItemText primary={option[labelKey]} />
                </MenuItem>
              ))}
            </Select>

            {helperText && (
              <FormHelperText error={invalid}>{helperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}

export default MultiSelect
