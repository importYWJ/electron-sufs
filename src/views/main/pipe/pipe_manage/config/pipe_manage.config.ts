import { ITable } from "@/base-ui/table";

export const tableConfig: ITable = {
  title: "模型列表",
  showSelectColumn: true,
  showIndexColumn: true,
  propList: [
    { prop: "inpid", label: "模型编号", minWidth: "180" },
    { prop: "name", label: "模型名称", minWidth: "180" },
    {
      prop: "inpid",
      label: "创建时间",
      minWidth: "180",
      slotName: "createDate",
    },
    { prop: "unit", label: "模拟单位", minWidth: "180" },
    { prop: "cfl", label: "步长系数", minWidth: "180" },
    { prop: "infiltration", label: "下渗模型", minWidth: "180" },
    { prop: "wave", label: "水流方式", minWidth: "180" },
    { prop: "minslope", label: "最小坡度", minWidth: "180" },
    { label: "模型操作", minWidth: "120", slotName: "handler" },
  ],
};
