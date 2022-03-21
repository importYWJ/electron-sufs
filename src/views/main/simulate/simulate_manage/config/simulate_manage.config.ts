import { IForm } from "@/base-ui/form";
import { ITable } from "@/base-ui/table";

export const basedModelConfig: IForm = {
  formItems: [
    {
      type: "select",
      field: "modelID",
      label: "模型名称",
      placeholder: "请选择模型名称...",
      options: [],
    },
  ],
  labelWidth: "80px",
  itemStyle: {
    padding: "5px 0px 5px 0px",
    margin: "0px",
  },
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
};

export const simulateTableConfig: ITable = {
  title: "模拟列表",
  showSelectColumn: true,
  showIndexColumn: false,
  propList: [
    { prop: "sid", label: "情景编号", minWidth: "180" },
    { prop: "simulationname", label: "情景名称", minWidth: "180" },
    {
      prop: "sid",
      label: "创建时间",
      minWidth: "180",
      slotName: "createDate",
    },
    { prop: "simulationmodel", label: "运算内核", minWidth: "180" },
    { label: "情景操作", minWidth: "120", slotName: "handler" },
  ],
};
