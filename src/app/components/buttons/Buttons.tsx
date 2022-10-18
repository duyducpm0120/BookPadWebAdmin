import { safeGet, safeGetBoolean } from '@core/utils';
import { Button } from '@mui/material';
import type { ContainedButtonProps } from './Buttons.types';
import AddIcon from '@mui/icons-material/Add';

export const ContainedButton = (props: ContainedButtonProps) => {
  const { onClick, title, isShowLeftIcon } = props;
  const leftIcon = safeGet(props, 'leftIcon', AddIcon);
  const showLeftIcon = safeGetBoolean(props, 'isShowLeftIcon', false);
  return (
    <Button variant="contained" startIcon={showLeftIcon ? leftIcon : null} onClick={onClick}>
      {title}
    </Button>
  );
};
