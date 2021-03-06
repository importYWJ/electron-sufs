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

export function addModelConfig(url: string, parList: any): Promise<any> {
  return wjRequest.post({
    url: url,
    data: parList,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function deleteModelConfig(url: string, modelID: string): Promise<any> {
  return wjRequest.delete({
    url: url,
    data: modelID,
  });
}

export function queryModelConfig(url: string, modelID: string): Promise<any> {
  return wjRequest.get({
    url: url,
    params: modelID,
  });
}

export function runModel(
  url: string,
  modelID: string,
  simulateID: string
): Promise<any> {
  return wjRequest.get({
    url: url,
    params: { modelID, simulateID },
  });
}

export function getModelProgress(url: string): Promise<any> {
  return wjRequest.get({
    url: url,
  });
}

export function changeRadarList(url: string, radarList: any): Promise<any> {
  return wjRequest.post({
    url: url,
    data: radarList,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
