export interface BPButtonProps {
  onClick: () => void;
  title: string;
  isShowLeftIcon?: boolean;
  leftIcon?: JSX.Element;
  type: 'contained' | 'outlined';
  textColor?: string;
}
