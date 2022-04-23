import { ILoginState } from "./login/types";
import { IModelState } from "./main/models/types";
import { IPipeState } from "./main/pipes/types";
import { IRadarState } from "./main/radar/types";

export interface IRootState {
  owner: string;
}

// 作用: 自定义useStore函数(store/types)用于view中, 使得TS能识别出Module中的类型
export interface IRootWithModule {
  loginModule: ILoginState;
  modelModule: IModelState;
  pipeModule: IPipeState;
  radarModule: IRadarState;
}

export type IStoreType = IRootState & IRootWithModule;
