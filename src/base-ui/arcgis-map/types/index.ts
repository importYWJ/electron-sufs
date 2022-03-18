import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
type IWidgetloactionType =
  | "top-right"
  | "top-left"
  | "bottom-left"
  | "bottom-right";

export interface IPoint {
  type: string;
  longitude: string;
  latitude: string;
}

export interface IToggleConfig {
  nextBasemap: string;
  widget_location: IWidgetloactionType;
}

export interface IMap {
  apiKey: string;
  center_X?: number; // 经度
  center_Y?: number; // 纬度
  scale?: number; // 缩放尺寸
  tileLayers?: VectorTileLayer[];
  showToggle?: boolean;
  toggleInfo?: IToggleConfig;
}
