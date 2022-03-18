export interface ITableItem {
  prop?: string;
  label: string;
  minWidth: string;
  slotName?: string;
}

export interface ITable {
  title?: string;
  showSelectColumn: boolean;
  showIndexColumn: boolean;
  propList: ITableItem[];
}
