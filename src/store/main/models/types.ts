export interface IModelItem {
  scid: string;
  sceneryname: string;
  scenerytype: string;
  description: string;
  area: string;
}

export interface IModelState {
  modelList: Array<IModelItem>;
  simulateList: any[];
  modelCount: number;
  simulateCount: number;
}
