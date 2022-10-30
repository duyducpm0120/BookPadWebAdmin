import { FONT_SIZE } from '@core/const/font';
import { Box, Drawer, Typography } from '@mui/material';
import { BPButton } from '../buttons';
import type { BPButtonProps } from '../buttons/BPButtons.types';
import { useStyles } from './BPDrawer.style';

export interface BPDrawerButtonParams extends BPButtonProps {
  isShow: boolean;
}

export interface BPDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  primaryButtonParams?: BPDrawerButtonParams;
  secondaryButtonParams?: BPDrawerButtonParams;
  children: React.ReactNode;
}

export const BPDrawer = (props: BPDrawerProps) => {
  const styles = useStyles();
  const {
    open,
    onClose,
    title,
    primaryButtonParams = {
      isShow: false,
      label: '',
      onClick: () => {},
      type: 'contained',
      leftIcon: null
    },
    secondaryButtonParams = {
      isShow: false,
      label: '',
      onClick: () => {},
      type: 'contained',
      leftIcon: null
    },
    children
  } = props;
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* {rightDrawerViewAndEditUI} */}
      <Box className={styles.wrapper}>
        <Box className={styles.contentWrapper}>
          <Typography variant="h4" fontSize={FONT_SIZE.fontSize24}>
            {title}
          </Typography>
          {children}
        </Box>
        <Box className={styles.buttonsWrapper}>
          {secondaryButtonParams.isShow ? (
            <BPButton
              label={secondaryButtonParams.label}
              onClick={secondaryButtonParams.onClick}
              type={secondaryButtonParams.type}
              style={{
                width: '45%'
              }}
              leftIcon={secondaryButtonParams.leftIcon}
            />
          ) : null}
          {primaryButtonParams.isShow ? (
            <BPButton
              label={primaryButtonParams.label}
              onClick={primaryButtonParams.onClick}
              type={primaryButtonParams.type}
              style={{
                width: secondaryButtonParams.isShow ? '45%' : '100%'
              }}
              leftIcon={primaryButtonParams.leftIcon}
            />
          ) : null}
        </Box>
      </Box>
    </Drawer>
  );
};
