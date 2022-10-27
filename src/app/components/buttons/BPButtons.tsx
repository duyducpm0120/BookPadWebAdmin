import { safeGet } from '@core/utils';
import { Button } from '@mui/material';
import type { ContainedButtonProps } from './BPButtons.types';
import AddIcon from '@mui/icons-material/Add';

export const BPButton = (props: ContainedButtonProps) => {
  const { onClick, title, isShowLeftIcon = false } = props;
  const leftIcon = safeGet(props, 'leftIcon', AddIcon);

  return (
    <Button variant="contained" startIcon={isShowLeftIcon ? leftIcon : null} onClick={onClick}>
      {title}
    </Button>
  );
};
