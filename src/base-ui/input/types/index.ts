export interface IInputItem {
  field: string;
  label?: string;
  rules?: any;
  placeholder?: any;
  options?: any[];
  hasAppend?: boolean;
  appendValue?: string;
  hasPrepend?: boolean;
  hasButton?: boolean;
  btnName?: string;
  action?: string;
  fileList?: Array<any>;
  accept?: string;
}

export interface IInput {
  inputItems: IInputItem[];
  labelWidth?: string;
  labelPosition?: string;
  itemStyle?: any;
}
