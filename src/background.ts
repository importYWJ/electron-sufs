"use strict";

import { app, protocol, BrowserWindow, Menu } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// 在应用程序准备就绪之前，必须注册Scheme。
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // 创建浏览器窗口。
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    // frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !(process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 如果处于开发模式，请加载开发服务器的url
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // 在未开发时加载index.html
    win.loadURL("app://./index.html");
  }
}

// 关闭所有窗口后退出。
app.on("window-all-closed", () => {
  // 在MacOS上，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 在MacOS上，当点击dock图标且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// 当Electron完成初始化并准备创建浏览器窗口时，将调用此方法。
//某些API只能在该事件发生后使用。
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e: any) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// 在开发模式下，根据父进程的请求干净地退出。
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

Menu.setApplicationMenu(null);
