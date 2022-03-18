export interface IInputItem {
  field: string;
  label?: string;
  rules?: any;
  placeholder?: any;
  options?: any[];
  hasButton?: boolean;
  btnName?: string;
  hasAppend?: boolean;
  appendValue?: string;
  hasPrepend?: boolean;
}

export interface IInput {
  inputItems: IInputItem[];
  labelWidth?: string;
  labelPosition?: string;
  itemStyle?: any;
}
