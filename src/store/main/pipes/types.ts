export interface IPipeModelItem {
  inpid: string;
  name: string;
  unit: string;
  cfl: string;
  infiltration: string;
  wave: string;
  minslope: string;
}

export interface IPipeState {
  pipeModelList: Array<IPipeModelItem>;
  pipeModelCount: number;
  conduitFieldsList: Array<string>;
  junctionFieldsList: Array<string>;
  outfallFieldsList: Array<string>;
}
