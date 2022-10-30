import { MenuItem, TextField } from '@mui/material';
import { isNil } from 'lodash';
import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { BPTextFieldProps } from './BPTextField.types';

const refactorTextField = (props: BPTextFieldProps, ref: ForwardedRef<null>) => {
  const {
    label,
    value = null,
    onChange,
    fullWidth = true,
    autoFocus = false,
    startIcon = null,
    style = {},
    multiSelectParams = null,
    error = false,
    helperText = null,
    multiline = false,
    rows = 1,
    disabled = false,
    defaultValue = null
  } = props;
  return (
    <TextField
      // id="outlined-select-currency-native"
      inputRef={ref}
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      error={error}
      helperText={helperText}
      sx={{
        margin: 0
      }}
      InputProps={{
        startAdornment: startIcon,
        style
      }}
      select={multiSelectParams !== null}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      defaultValue={defaultValue}>
      {!isNil(multiSelectParams) &&
        multiSelectParams.options.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
    </TextField>
  );
};

export const BPTextField = forwardRef(refactorTextField);
