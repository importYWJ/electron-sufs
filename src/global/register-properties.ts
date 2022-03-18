import { App } from "vue";
import { formatTimestamp } from "@/utils/format-date";

export default function (app: App): any {
  app.config.globalProperties.$filters = {
    formatTimestamp: formatTimestamp,
  };
}
