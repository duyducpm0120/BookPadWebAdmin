import { MenuItem, TextField } from '@mui/material';
import { isNil } from 'lodash';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { BPTextFieldProps } from './BPTextField.types';

const RefactorTextField = (props: BPTextFieldProps, ref: ForwardedRef<null>) => {
  const {
    label,
    value = null,
    onChange,
    fullWidth = true,
    autoFocus = false,
    startIcon = null,
    inputStyle: style = {},
    multiSelectParams = null,
    error = false,
    errorText = null,
    multiline = false,
    numberOfLines = 1,
    disabled = false,
    defaultValue = null,
    type = 'text',
    InputProps = {},
    InputLabelProps = {}
  } = props;

  return (
    <TextField
      // id="outlined-select-currency-native"
      type={type}
      inputRef={ref}
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      error={error}
      helperText={errorText !== null && error ? errorText : ''}
      sx={{
        margin: 0
      }}
      InputProps={{
        startAdornment: startIcon,
        style,
        ...InputProps
      }}
      InputLabelProps={
        type === 'datetime-local' ? { shrink: true, ...InputLabelProps } : InputLabelProps
      }
      select={multiSelectParams !== null}
      multiline={multiline}
      rows={numberOfLines}
      disabled={disabled}
      defaultValue={value === null ? defaultValue : null}
      style={{ ...style }}>
      {!isNil(multiSelectParams) &&
        multiSelectParams.options.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export const BPTextField = forwardRef(RefactorTextField);
