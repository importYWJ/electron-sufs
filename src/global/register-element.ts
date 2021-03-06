import "element-plus/theme-chalk/base.css";
import "element-plus/theme-chalk/index.css";
import { App } from "vue";

import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElContainer,
  ElMain,
  ElHeader,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElIcon,
  ElCard,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRadioGroup,
  ElDatePicker,
  ElTimePicker,
  ElOption,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTabs,
  ElTabPane,
  ElUpload,
  ElDrawer,
  ElProgress,
  ElDialog,
  ElScrollbar,
  ElTooltip,
  ElDivider,
} from "element-plus";

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElAlert,
  ElAside,
  ElContainer,
  ElMain,
  ElHeader,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElIcon,
  ElCard,
  ElRow,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDatePicker,
  ElTimePicker,
  ElOption,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElTabs,
  ElTabPane,
  ElUpload,
  ElDrawer,
  ElProgress,
  ElDialog,
  ElScrollbar,
  ElTooltip,
  ElDivider,
];

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component);
  }
}
