type IFormItemType =
  | "input"
  | "password"
  | "radio"
  | "select"
  | "datepicker"
  | "timepicker";

export interface IFormItem {
  type: IFormItemType;
  field: string;
  label?: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  dateOptions?: any;
}

export interface IForm {
  formItems: IFormItem[];
  labelWidth?: string;
  labelPosition?: string;
  itemStyle?: any;
  colLayout?: any;
}
