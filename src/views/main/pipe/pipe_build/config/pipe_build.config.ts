import { IInput } from "@/base-ui/input";
import { ITable } from "@/base-ui/table";
import { IForm } from "@/base-ui/form";

// 管线建模
export const pipeLineFileConfig: IInput = {
  inputItems: [
    {
      field: "pipelinefile",
      placeholder: "请输入管线Shp文件...",
      rules: [
        {
          required: true,
          message: "必须输入管线Shp文件",
          trigger: "blur",
        },
      ],
      hasButton: true,
      btnName: "导入数据",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const pipelineTableConfig: ITable = {
  showIndexColumn: false,
  showSelectColumn: false,
  propList: [
    { prop: "origin", label: "原始字段", minWidth: "180" },
    { prop: "match", label: "匹配字段", minWidth: "180" },
  ],
};

// 管点建模
export const pipePointFileConfig: IInput = {
  inputItems: [
    {
      field: "pipepointFile",
      placeholder: "请输入管点Shp文件...",
      rules: [
        {
          required: true,
          message: "必须输入管点Shp文件",
          trigger: "blur",
        },
      ],
      hasButton: true,
      btnName: "导入数据",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const pipePointTableConfig: ITable = {
  showIndexColumn: false,
  showSelectColumn: false,
  propList: [
    { prop: "origin", label: "原始字段", minWidth: "180" },
    { prop: "match", label: "匹配字段", minWidth: "180" },
  ],
};

// 排水口建模
export const pipeOutfallFileConfig: IInput = {
  inputItems: [
    {
      field: "pipeOutfallFile",
      placeholder: "请输入排水口Shp文件...",
      rules: [
        {
          required: true,
          message: "必须输入排水口Shp文件",
          trigger: "blur",
        },
      ],
      hasButton: true,
      btnName: "导入数据",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const pipeOutfallTableConfig: ITable = {
  showIndexColumn: false,
  showSelectColumn: false,
  propList: [
    { prop: "origin", label: "原始字段", minWidth: "180" },
    { prop: "match", label: "匹配字段", minWidth: "180" },
  ],
};

export const pipeInfiltrationConfig: IForm = {
  formItems: [
    {
      type: "radio",
      field: "type",
      options: [
        {
          radioLabel: "Horton",
          value: "Horton",
        },
        {
          radioLabel: "Curve Number",
          value: "Curve Number",
        },
        {
          radioLabel: "Green Ampt",
          value: "Green Ampt",
        },
      ],
    },
  ],
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
  itemStyle: {
    margin: "5px 0",
  },
};

export const pipeFlowTypeConfig: IForm = {
  formItems: [
    {
      type: "radio",
      field: "type",
      options: [
        {
          radioLabel: "Dynamic Wave",
          value: "Dynamic Wave",
        },
        {
          radioLabel: "Steady Flow",
          value: "Steady Flow",
        },
        {
          radioLabel: "KineMatic Wave",
          value: "KineMatic Wave",
        },
      ],
    },
  ],
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
  itemStyle: {
    margin: "10px 0",
  },
};

export const pipeMinSlopeConfig: IInput = {
  inputItems: [
    {
      field: "pipeMinSlope",
      placeholder: "请输入管道最小坡度...",
      rules: [
        {
          required: true,
          message: "必须输入管道最小坡度",
          trigger: "blur",
        },
      ],
      hasAppend: true,
      appendValue: "度",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const pipeStepRegulationConfig: IInput = {
  inputItems: [
    {
      field: "pipeStepRegulation",
      placeholder: "请输入管网模拟步长调控系数...",
      rules: [
        {
          required: true,
          message: "必须输入管网模拟步长调控系数",
          trigger: "blur",
        },
      ],
      hasAppend: true,
      appendValue: "%",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const pipeModelBtnConfig: IInput = {
  inputItems: [
    {
      field: "pipeModel",
      placeholder: "请输入管网模型名称...",
      rules: [
        {
          required: true,
          message: "必须输入管网模型名称",
          trigger: "blur",
        },
      ],
      hasButton: true,
      btnName: "生成模型",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};
