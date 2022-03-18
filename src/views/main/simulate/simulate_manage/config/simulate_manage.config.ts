import { ITable } from "@/base-ui/table";

export const modelTableConfig: ITable = {
  title: "模型列表",
  showSelectColumn: false,
  showIndexColumn: true,
  propList: [
    { prop: "scid", label: "模型编号", minWidth: "180" },
    { prop: "sceneryname", label: "模型名称", minWidth: "180" },
    {
      prop: "scid",
      label: "创建时间",
      minWidth: "180",
      slotName: "createDate",
    },
    { prop: "scenerytype", label: "模型类型", minWidth: "180" },
    { prop: "description", label: "模型描述", minWidth: "180" },
    { prop: "area", label: "模拟区域", minWidth: "180" },
    { label: "模型操作", minWidth: "120", slotName: "handler" },
  ],
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
