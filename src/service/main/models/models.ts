import wjRequest from "@/service";
import axios from "axios";

export function getTableList(url: string, queryInfo: any): Promise<any> {
  return wjRequest.get({
    url: url,
    params: queryInfo,
  });
}

export function getModelRunning(url: string, parList: any): Promise<any> {
  return wjRequest.post({
    url: url,
    data: parList,
  });
}

export function postModelConfig(url: string, parList: any): Promise<any> {
  return wjRequest.post({
    url: url,
    data: parList,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
