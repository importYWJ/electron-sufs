import { IForm } from "@/base-ui/form";
import { IInput } from "@/base-ui/input";

export const basicInfoConfig: IForm = {
  formItems: [
    {
      type: "select",
      field: "modelName",
      label: "模型名称",
      placeholder: "请选择模型名称...",
      options: [],
    },
    {
      type: "select",
      field: "mode",
      label: "计算模式",
      placeholder: "请选择计算模式...",
      options: [
        { value: "acceleration", label: "acceleration" },
        { value: "flow limited", label: "flow limited" },
        { value: "adaptive", label: "adaptive" },
      ],
    },
  ],
  labelWidth: "80px",
  itemStyle: {
    padding: "5px 0px 5px 10px",
  },
  colLayout: {
    xl: 12,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24,
  },
};

export const rainfallConfig: IInput = {
  inputItems: [
    {
      field: "rainfall",
      placeholder: "请打开时序降雨文件...",
      hasButton: true,
      btnName: "打开文件",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};

export const dynamic_rain_fileConfig: IInput = {
  inputItems: [
    {
      field: "dynamic_rain_file",
      placeholder: "请打开netCDF格式降雨文件...",
      hasButton: true,
      btnName: "打开文件",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};

export const totalTimeConfig: IInput = {
  inputItems: [
    {
      field: "sim_time",
      label: "内涝事件总时长：",
      placeholder: "请输入降雨模拟总时长...",
      hasAppend: true,
      appendValue: " 秒(s) ",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
  labelWidth: "130px",
};

export const detailTimeConfig: IForm = {
  formItems: [
    {
      type: "datepicker",
      field: "start_date",
      label: "起始日期",
      dateOptions: {
        type: "date",
      },
    },
    {
      type: "timepicker",
      field: "start_time",
      label: "起始时刻",
    },
    {
      type: "datepicker",
      field: "end_date",
      label: "结束日期",
      dateOptions: {
        type: "date",
      },
    },
    {
      type: "timepicker",
      field: "end_time",
      label: "结束时刻",
    },
  ],
  labelWidth: "90px",
  itemStyle: {
    padding: "0px",
  },
  colLayout: {
    xl: 12,
    lg: 12,
    md: 12,
    sm: 12,
    xs: 12,
  },
};

export const otherInfoConfig: IInput = {
  inputItems: [
    {
      field: "initial_tstep",
      label: "模拟时间步长：",
      placeholder: "请输入模拟时间步长...",
      hasAppend: true,
      appendValue: " 秒(s) ",
    },
    {
      field: "saveint",
      label: "结果输出时间步长：",
      placeholder: "结果输出时间步长...",
      hasAppend: true,
      appendValue: " 分钟(min) ",
    },
    {
      field: "massint",
      label: "水体质量平衡检查时间间隔：",
      placeholder: "请输入降雨模拟总时长...",
      hasAppend: true,
      appendValue: " 秒(s) ",
    },
    {
      field: "cfl",
      label: "水动力计算时间步长安全系数：",
      placeholder: "动力计算时间步长安全系数...",
      hasAppend: true,
      appendValue: " 秒(s) ",
    },
  ],
  itemStyle: {
    margin: "10px 0 10px 20px",
  },
  labelWidth: "210px",
  labelPosition: "left",
};
