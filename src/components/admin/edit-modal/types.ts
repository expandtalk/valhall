
export interface FieldOption {
  value: string;
  label: string;
}

export interface EditModalField {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  options?: Array<FieldOption> | string[];
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  item: any;
  isLoading: boolean;
  fields?: EditModalField[];
}
