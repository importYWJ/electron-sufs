import wjRequest from "@/service";

export function getPipeFields(url: string, shpData: any): Promise<any> {
  return wjRequest.post({
    url: url,
    data: shpData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
