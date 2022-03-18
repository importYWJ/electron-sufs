import wjRequest from "@/service";

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
