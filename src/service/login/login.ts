import wjRequest from "../index";
import { IAccount, ILoginResult, IDataType } from "./type";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "users/",
  UserMenus = "/role/",
}

export function accountLoginRequest(account: IAccount) {
  return wjRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number, token: string) {
  return wjRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    headers: { Authorization: token },
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number, token: string) {
  return wjRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    headers: { Authorization: token },
    showLoading: false,
  });
}
