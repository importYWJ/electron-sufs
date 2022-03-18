import { IForm } from "@/base-ui/form";
import { ITable } from "@/base-ui/table";

export const formConfig: IForm = {
  formItems: [
    {
      type: "input",
      field: "name",
      label: "模型名称",
      placeholder: "请输入模型名称...",
    },
    {
      type: "input",
      field: "area",
      label: "模拟区域",
      placeholder: "请输入模型区域...",
    },
    {
      type: "input",
      field: "description",
      label: "模型描述",
      placeholder: "请输入模型描述...",
    },
    {
      type: "radio",
      field: "type",
      label: "模拟方式",
      options: [
        {
          radioLabel: "一维二维耦合洪涝模拟",
          value: "1d_2d",
        },
        {
          radioLabel: "地表二维洪涝模拟",
          value: "2d",
        },
        {
          radioLabel: "地下一维洪涝模拟",
          value: "1d",
        },
      ],
    },
    {
      type: "datepicker",
      field: "timerange",
      label: "模拟时间",
      dateOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
  labelWidth: "100px",
  itemStyle: {
    padding: "5px 30px",
  },
  colLayout: {
    xl: 8,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24,
  },
};

export const tableConfig: ITable = {
  title: "模型列表",
  showSelectColumn: true,
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
