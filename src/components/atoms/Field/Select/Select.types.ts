export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  describedBy?: string;
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
};
