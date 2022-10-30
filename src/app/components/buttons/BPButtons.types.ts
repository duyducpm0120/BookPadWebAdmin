export interface BPButtonProps {
  onClick: () => void;
  label: string;
  leftIcon?: JSX.Element;
  type: 'contained' | 'outlined';
  textColor?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}
