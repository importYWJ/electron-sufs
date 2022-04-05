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
      accept: ".shp, .dbf, .sbn, .sbx, .shx, .prj",
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
    { prop: "match", label: "匹配字段", minWidth: "180", slotName: "shpfield" },
  ],
};

// 管点建模
export const pipePointFileConfig: IInput = {
  inputItems: [
    {
      field: "pipepointfile",
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
      accept: ".shp, .dbf, .sbn, .sbx, .shx, .prj",
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
    { prop: "match", label: "匹配字段", minWidth: "180", slotName: "shpfield" },
  ],
};

// 排水口建模
export const pipeOutfallFileConfig: IInput = {
  inputItems: [
    {
      field: "pipeoutfallfile",
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
      accept: ".shp, .dbf, .sbn, .sbx, .shx, .prj",
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
    { prop: "match", label: "匹配字段", minWidth: "180", slotName: "shpfield" },
  ],
};

export const pipeInfiltrationConfig: IForm = {
  formItems: [
    {
      type: "radio",
      field: "Infiltration",
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
      field: "FlowType",
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
      field: "MinSlope",
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
      field: "StepRegulation",
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

export const pipeSimulateUnitConfig: IForm = {
  formItems: [
    {
      type: "select",
      field: "unit",
      label: "管线模拟单位",
      placeholder: "请选择管线模拟单位...",
      options: [
        { value: "CMS", label: "CMS" },
        { value: "CFS", label: "CFS" },
        { value: "GPM", label: "GPM" },
        { value: "MGD", label: "MGD" },
        { value: "LPS", label: "LPS" },
        { value: "MLD", label: "MLD" },
      ],
      rules: [
        {
          required: true,
          message: "管线模拟单位为必选项！",
          trigger: "blur",
        },
      ],
    },
  ],
  labelWidth: "120px",
  itemStyle: {
    padding: "15px 0px 0px",
  },
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
};

export const pipeModelNameConfig: IInput = {
  inputItems: [
    {
      field: "ModelName",
      placeholder: "请输入管网模型名称...",
      rules: [
        {
          required: true,
          message: "必须输入管网模型名称",
          trigger: "blur",
        },
      ],
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};
