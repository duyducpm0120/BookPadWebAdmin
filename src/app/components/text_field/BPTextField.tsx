import { MenuItem, TextField } from '@mui/material';
import { isNil } from 'lodash';
import type { BPTextFieldProps } from './BPTextField.types';

export const BPTextField = (props: BPTextFieldProps) => {
  const {
    label,
    value,
    onChange,
    fullWidth = true,
    autoFocus = false,
    startIcon = null,
    style = {},
    multiSelectParams = null
  } = props;
  return (
    <TextField
      // id="outlined-select-currency-native"
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
      fullWidth={fullWidth}
      autoFocus={autoFocus}
      sx={{
        margin: 0
      }}
      InputProps={{
        startAdornment: startIcon,
        style
      }}
      select={multiSelectParams !== null}>
      {!isNil(multiSelectParams) &&
        multiSelectParams.options.map((item) => (
          <MenuItem key={item.label} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
    </TextField>
  );
};
