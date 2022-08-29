/* eslint-disable */
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import React, { createElement } from 'react';
import { Controller, ControllerProps, FieldError } from 'react-hook-form';

export type SelectElementProps = Omit<
  TextFieldProps,
  'name' | 'type' | 'onChange'
> & {
  validation?: ControllerProps['rules'];
  name: string;
  options?: any[];
  valueKey?: string;
  labelKey?: string;
  type?: 'string' | 'number';
  parseError?: (error: FieldError) => string;
  onChange?: (value: any) => void;
};

const Select = React.memo(
  ({
    name,
    label,
    required,
    valueKey = 'value',
    labelKey = 'label',
    options = [],
    parseError,
    type,
    ...rest
  }: SelectElementProps): JSX.Element => {
    const isNativeSelect = !!rest.SelectProps?.native
    const ChildComponent = isNativeSelect ? 'option' : MenuItem

    return (
      <Controller
        name={name as any}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { invalid, error },
        }) => {
          // handle shrink on number input fields
          if (type === 'number' && value) {
            rest.InputLabelProps = rest.InputLabelProps || {}
            rest.InputLabelProps.shrink = true
          }

          return (
            <TextField
              sx={{ minWidth: 120 }}
              name={name}
              label={label ? `${label} ${required ? ' *' : ''}` : ''}
              value={value || ''}
              onBlur={onBlur}
              onChange={(event) => {
                let item: number | string = event.target.value
                if (type === 'number') item = Number(item)
                onChange(item)
              }}
              select
              required={required}
              error={invalid}
              helperText={error ? typeof parseError === 'function' ? parseError(error as any) : error.message : rest.helperText}
              {...rest}
            >
              {isNativeSelect && <option />}
              {options.map((item: any) => {
                const value = typeof item === 'object' ? item[valueKey] : item
                const label = typeof item === 'object' ? item[labelKey] : item
                return createElement(
                  ChildComponent,
                  { key: `${name}_${value}`, value },
                  label
                )
              })}
            </TextField>
          )
        }}
      />
    )
  }
);

export default Select;
