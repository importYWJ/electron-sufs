import wjRequest from "../../index";

enum DashboardAPI {
  categoryGoodsCount = "/goods/category/count",
  categoryGoodsSale = "/goods/category/sale",
  categoryGoodsFavor = "/goods/category/favor",
  addressGoodsSale = "/goods/address/sale",
}

export function getCategoryGoodsCount(token: string) {
  return wjRequest.get({
    url: DashboardAPI.categoryGoodsCount,
    headers: { Authorization: token },
  });
}

export function getCategoryGoodsSale(token: string) {
  return wjRequest.get({
    url: DashboardAPI.categoryGoodsSale,
    headers: { Authorization: token },
  });
}

export function getCategoryGoodsFavor(token: string) {
  return wjRequest.get({
    url: DashboardAPI.categoryGoodsFavor,
    headers: { Authorization: token },
  });
}

export function getAddressGoodsSale(token: string) {
  return wjRequest.get({
    url: DashboardAPI.addressGoodsSale,
    headers: { Authorization: token },
  });
}
