/* eslint-disable */
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from '@mui/material';
import React from 'react';
import { Controller, FieldError } from 'react-hook-form';

export type TextFieldProps = Omit<MUITextFieldProps, 'name'> & {
  name: string;
  parseError?: (error: FieldError) => string;
};

const TextField = React.memo(
  ({
    parseError,
    type,
    required,
    name,
    label,
    ...rest
  }: TextFieldProps): JSX.Element => (
    <Controller
      name={name as any}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
      }) => (
        <MUITextField
          {...rest}
          name={name}
          label={label}
          value={value || ''}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          error={invalid}
          sx={{ width: '100%' }}
          helperText={error ? typeof parseError === 'function' ? parseError(error as any) : error.message : rest.helperText}
        />
      )}
    />
  ),
);

export default TextField;
