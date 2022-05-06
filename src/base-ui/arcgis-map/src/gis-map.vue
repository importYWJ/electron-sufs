<template>
  <div id="wj-map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BasemapToggle from "@arcgis/core/widgets/BasemapToggle";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Basemap from "@arcgis/core/Basemap";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import "@arcgis/core/assets/esri/css/main.css";
import Point from "@arcgis/core/geometry/Point";
import Query from "@arcgis/core/rest/support/Query";
import Sketch from "@arcgis/core/widgets/Sketch";
import Popup from "@arcgis/core/widgets/Popup";

export default defineComponent({
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    center_X: {
      type: Number,
      default: 118.745792,
    },
    center_Y: {
      type: Number,
      default: 32.063214,
    },
    scale: {
      type: Number,
      default: 3,
    },
    toggleInfo: {
      type: Object,
      default: () => ({
        nextBasemap: "arcgis-imagery",
        widget_location: "top-right",
      }),
    },
  },
  setup(props) {
    // 3.定义图层
    const vectorTileLayer = new VectorTileLayer({
      portalItem: {
        id: "6976148c11bd497d8624206f9ee03e30", // Forest and Parks Canvas
      },
      opacity: 0.75,
    });
    const imageTileLayer = new TileLayer({
      portalItem: {
        id: "1b243539f4514b6ba35e7d995890db1d", // World Hillshade
      },
    });
    const basemap = new Basemap({
      baseLayers: [imageTileLayer, vectorTileLayer],
    });
    const map = new Map({
      // basemap: "arcgis-topographic",
      basemap: basemap,
      layers: [],
    });
    const view = new MapView({
      container: "wj-map",
      map: map,
      // zoom: 12,
      // center: [118.751038, 32.06354],
      center: [props.center_X, props.center_Y],
      zoom: props.scale,
      // 3D图层需要camera属性
    });
    // 2.底图切换功能
    // 2.1 创建底图切换: 设置视图view, 定义nextBasemap属性
    const basemapToggle = new BasemapToggle({
      view: view,
      nextBasemap: props.toggleInfo.nextBasemap,
    });
    // 3.图形图层: 添加点线面
    const graphicsLayer = new GraphicsLayer();
    // 3.1 点图形创建
    const point = {
      type: "point",
      longitude: props.center_X,
      latitude: props.center_Y,
    };
    const simpleMarkerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40],
      outline: {
        color: [255, 255, 255], // White
        width: 1,
      },
    };
    const pointGraphic = new Graphic({
      geometry: point as Point,
      symbol: simpleMarkerSymbol,
    });

    // 4. 属性(SQL)查询
    const parcelLayerSQL = [
      "Choose a SQL where clause...",
      "UseType = 'Residential'",
      "UseType = 'Government'",
      "UseType = 'Irrigated Farm'",
      "TaxRateArea = 10853",
      "TaxRateArea = 10860",
      "TaxRateArea = 08637",
      "Roll_LandValue > 1000000",
      "Roll_LandValue < 1000000",
    ];
    let whereClause = parcelLayerSQL[0];
    // 定义查询图层
    const parcelLayer = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
    });
    // 执行查询(加入事件监听) queryFeatureLayer(view.extent);
    function queryFeatureLayer(extent: any) {
      const parcelQuery = {
        where: whereClause, // 空间查询时无此部分
        spatialRelationship: "intersects", // 空间操作: 相交
        geometry: extent, // 限制可视范围
        outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"], // 要返回的属性
        returnGeometry: true,
      };
      parcelLayer
        .queryFeatures(parcelQuery as Query)
        .then((res) => {
          // console.log("Feature count: " + res.features.length);
          displayResults(res);
        })
        .catch((err) => {
          console.log(err.error);
        });
    }
    // 展示
    function displayResults(results: any) {
      // Create a blue polygon
      const symbol = {
        type: "simple-fill",
        color: [20, 130, 200, 0.5],
        outline: {
          color: "white",
          width: 0.5,
        },
      };
      const popupTemplate = {
        title: "Parcel {APN}",
        content:
          "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}",
      };
      results.features.map((feature: any) => {
        feature.symbol = symbol;
        feature.popupTemplate = popupTemplate;
        return feature;
      });
      view.popup.close();
      view.graphics.removeAll();
      // Add features to graphics layer
      view.graphics.addMany(results.features);
    }

    // 空间查询
    const graphicsLayerSketch = new GraphicsLayer();
    const sketch = new Sketch({
      layer: graphicsLayerSketch,
      view: view,
      creationMode: "update", // Auto-select
    });

    onMounted(() => {
      //定义key
      esriConfig.apiKey = props.apiKey;
      view.container = document.getElementById("wj-map") as HTMLDivElement;
      // 2.2 将widget添加到视图右下角
      // 添加DOM元素
      view.ui.add(basemapToggle, props.toggleInfo.widget_location);
      view.ui.add(sketch, "top-right");
      // Add sketch events to listen for and execute query
      sketch.on("update", (event) => {
        // 新建
        if (event.state === "start") {
          queryFeatureLayer(event.graphics[0].geometry);
        }
        if (event.state === "complete") {
          graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphic when a user clicks off of it or sketches new one
        }
        // 改变
        if (
          event.toolEventInfo &&
          (event.toolEventInfo.type === "scale-stop" ||
            event.toolEventInfo.type === "reshape-stop" ||
            event.toolEventInfo.type === "move-stop")
        ) {
          queryFeatureLayer(event.graphics[0].geometry);
        }
      });
      // 2.3 从底图库(BasemapGallery)中选择基本地图(略)
      map.addMany([graphicsLayer, graphicsLayerSketch]);
      graphicsLayer.add(pointGraphic);
    });
    return {};
  },
});
</script>

<style scoped>
#wj-map {
  padding: 0;
  margin: 0;
  height: 100%;
  box-shadow: 10px 10px 20px #dddde0, -10px -10px 20px #ffffff;
}
</style>
