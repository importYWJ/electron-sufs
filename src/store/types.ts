import { ILoginState } from "./login/types";
import { IModelState } from "./main/models/types";

export interface IRootState {
  owner: string;
}

// 作用: 自定义useStore函数(store/types)用于view中, 使得TS能识别出Module中的类型
export interface IRootWithModule {
  loginModule: ILoginState;
  modelModule: IModelState;
}

export type IStoreType = IRootState & IRootWithModule;
