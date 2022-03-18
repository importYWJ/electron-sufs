import { IBreadcrumb } from "@/base-ui/breadcrumb/types";
import { RouteRecordRaw } from "vue-router";

let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1. 先去加载默认所有routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/); // true代表递归查找文件夹下的ts文件
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  // 2. 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    if (menus != null) {
      menus.forEach((menu) => {
        // 若为菜单无children
        if (menu.type === 2) {
          const route = allRoutes.find((route) => {
            return route.path === menu.url;
          });
          if (route) {
            routes.push(route);
            if (!firstMenu) {
              firstMenu = menu;
            }
          }
        } else {
          // 若菜单有children
          _recurseGetRoute(menu.children);
        }
      });
    }
  };
  //   for (const menu of menus) {
  //     // 若为菜单无children
  //     if (menu.type === 2) {
  //       const route = allRoutes.find((route) => {
  //         return route.path === menu.url
  //       })
  //       if (route) {
  //         routes.push(route)
  //       }
  //     } else {
  //       // 若菜单有children
  //       _recurseGetRoute(menu.children)
  //     }
  //   }
  // }
  // console.log(allRoutes)
  // console.log(userMenus)
  _recurseGetRoute(userMenus);
  // console.log(routes, 123)
  return routes;
}

export function pathMapBreadcrumbs(userMneus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToManu(userMneus, currentPath, breadcrumbs);
  return breadcrumbs;
}

export function pathMapToManu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToManu(menu.children ?? [], currentPath);
      if (findMenu) {
        // breadcrumbs?.push({ name: menu.name, path: menu.url });
        // breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export { firstMenu };
