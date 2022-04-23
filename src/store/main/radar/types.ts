export interface IRadarItem {
  x: string;
  y: string;
  value: string;
}

export interface IRadarState {
  zhList: Array<Array<IRadarItem>>;
  zdrList: Array<Array<IRadarItem>>;
  kdpList: Array<Array<IRadarItem>>;
}
