import { Button } from '@mui/material';
import type { BPButtonProps } from './BPButtons.types';
import { APP_THEME, COMMON_COLOR, TEXT_COLOR } from '@core';

export const BPButton = (props: BPButtonProps) => {
  const {
    onClick,
    label: title,
    type = 'contained',
    textColor = APP_THEME.primary.main,
    leftIcon = null,
    style = {},
    disabled = false,
    children = null
  } = props;

  const refactorTextColor = type === 'contained' ? COMMON_COLOR.white : textColor;

  return (
    <Button
      variant={type}
      startIcon={leftIcon != null ? leftIcon : null}
      onClick={onClick}
      style={{
        ...style,
        color: disabled ? TEXT_COLOR.light : refactorTextColor,
        borderWidth: type === 'outlined' ? 2 : 0
        // width: '40%'
      }}
      disabled={disabled}>
      {title}
      {children}
    </Button>
  );
};
