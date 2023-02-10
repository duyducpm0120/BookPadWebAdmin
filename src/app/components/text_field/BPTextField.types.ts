export interface BPTextFieldSelectOptionType {
  label: string;
  value: string;
}
export interface BPTextFieldProps {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  fullWidth?: boolean;
  autoFocus?: boolean;
  startIcon?: JSX.Element;
  inputStyle?: React.CSSProperties & {
    borderRadius?: number;
  };
  multiSelectParams?: {
    options: BPTextFieldSelectOptionType[];
  };
  error?: boolean;
  errorText?: string;
  multiline?: boolean;
  numberOfLines?: number;
  disabled?: boolean;
  defaultValue?: string;
  type?: 'text' | 'datetime-local';
  InputProps?: {};
  InputLabelProps?: {};
  containerStyle?: React.CSSProperties;
}
