import { Button } from '@mui/material';
import type { BPButtonProps } from './BPButtons.types';
import { APP_THEME } from '@core';

export const BPButton = (props: BPButtonProps) => {
  const {
    onClick,
    title,
    isShowLeftIcon = false,
    type = 'contained',
    textColor = APP_THEME.primary.main,
    leftIcon = null
  } = props;

  return (
    <Button
      variant={type}
      startIcon={isShowLeftIcon ? leftIcon : null}
      onClick={onClick}
      style={{
        color: textColor
      }}>
      {title}
    </Button>
  );
};
