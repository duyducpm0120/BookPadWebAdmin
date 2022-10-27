export interface BPTextFieldSelectOptionType {
  label: string;
  value: string;
}
export interface BPTextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  fullWidth?: boolean;
  autoFocus?: boolean;
  startIcon?: JSX.Element;
  style?: {
    borderRadius: number;
  };
  multiSelectParams?: {
    options: BPTextFieldSelectOptionType[];
  };
}
