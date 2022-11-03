import { SPACE } from '@core';
import { FONT_SIZE } from '@core/const/font';
import { Box, Drawer, Typography } from '@mui/material';
import { BlankSpacer } from '../BlankSpacer';
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
      leftIcon: null,
      disabled: false
    },
    secondaryButtonParams = {
      isShow: false,
      label: '',
      onClick: () => {},
      type: 'contained',
      leftIcon: null,
      disabled: false
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
          <BlankSpacer height={SPACE.spacing16} />
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
              disabled={secondaryButtonParams.disabled}
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
              disabled={primaryButtonParams.disabled}
            />
          ) : null}
        </Box>
      </Box>
    </Drawer>
  );
};
