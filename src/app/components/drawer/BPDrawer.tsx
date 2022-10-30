import { FONT_SIZE } from '@core/const/font';
import { Box, Drawer, Typography } from '@mui/material';
import { useStyles } from './BPDrawer.style';

export interface BPDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  primaryButtonParams?: {
    label: string;
    onClick: () => void;
  };
  secondaryButtonParams?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

export const BPDrawer = (props: BPDrawerProps) => {
  const styles = useStyles();
  const {
    open,
    onClose,
    title,
    primaryButtonParams = {
      isUsePrimaryButton: false,
      label: '',
      onClick: () => {}
    },
    secondaryButtonParams = {
      isUsePrimaryButton: false,
      label: '',
      onClick: () => {}
    },
    children
  } = props;
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* {rightDrawerViewAndEditUI} */}
      <Box className={styles.wrapper}>
        <Typography variant="h4" fontSize={FONT_SIZE.fontSize24}>
          {title}
        </Typography>
        {children}
      </Box>
    </Drawer>
  );
};
