import { IForm } from "@/base-ui/form";
import { IInput } from "@/base-ui/input";

export const basicInfoConfig: IForm = {
  formItems: [
    {
      type: "input",
      field: "name",
      label: "模型名称",
      placeholder: "请输入模型名称...",
      rules: [
        {
          required: true,
          message: "模型名称为必输项！",
          trigger: "blur",
        },
        { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
      ],
    },
    {
      type: "input",
      field: "area",
      label: "模拟区域",
      placeholder: "请输入模型区域...",
      rules: [{ min: 2, message: "长度必须大于2个字符", trigger: "blur" }],
    },
    {
      type: "input",
      field: "description",
      label: "模型描述",
      placeholder: "请输入模型描述...",
    },
  ],
  labelWidth: "80px",
  itemStyle: {
    padding: "8px 0px",
    margin: 0,
  },
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
};

export const modelTypeConfig: IForm = {
  formItems: [
    {
      type: "radio",
      field: "type",
      rules: [
        {
          required: true,
          message: "必须选择一种模拟方式！",
          trigger: "blur",
        },
      ],
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
  ],
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
};

export const DEMfileConfig: IInput = {
  inputItems: [
    {
      field: "DEMfile",
      placeholder: "请输入模型区域的高程文件...",
      rules: [
        {
          required: true,
          message: "必须输入DEM文件",
          trigger: "blur",
        },
      ],
      hasButton: true,
      btnName: "打开文件",
      accept: ".asc",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const riverfileConfig: IInput = {
  inputItems: [
    {
      field: "riverwidth",
      placeholder: "请输入河流宽度文件...",
      hasButton: true,
      btnName: "打开河流宽度文件",
      accept: ".asc",
    },
    {
      field: "riverheight",
      placeholder: "请输入河床高度文件...",
      hasButton: true,
      btnName: "打开河床高度文件",
      accept: ".asc",
    },
    {
      field: "riverelevation",
      placeholder: "请输入河岸高程文件...",
      hasButton: true,
      btnName: "打开河岸高程文件",
      accept: ".asc",
    },
  ],
  itemStyle: {
    margin: "15px 0 0 0",
  },
};

export const infiltration_fileConfig: IInput = {
  inputItems: [
    {
      field: "infiltration",
      placeholder: "请打开下渗率文件...",
      hasButton: true,
      btnName: "打开文件",
      accept: ".asc",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};

export const infiltration_uniformConfig: IInput = {
  inputItems: [
    {
      field: "infiltration",
      placeholder: "请设置统一的下渗率...",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};

export const evaporation_fileConfig: IInput = {
  inputItems: [
    {
      field: "evaporation",
      placeholder: "请打开蒸发率文件...",
      hasButton: true,
      btnName: "打开文件",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};

export const evaporation_uniformConfig: IInput = {
  inputItems: [
    {
      field: "evaporation",
      placeholder: "请输入统一的蒸发率...",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
};

export const monitorConfig: IInput = {
  inputItems: [
    {
      field: "stagefile",
      placeholder: "请输入地面监测点文件...",
      hasButton: true,
      btnName: "打开文件",
      accept: ".stage",
    },
  ],
  itemStyle: {
    margin: "15px 0",
  },
};

export const pipeModelConfig: IForm = {
  formItems: [
    {
      type: "select",
      field: "inp_file",
      placeholder: "请选择构建的管网模型...",
      options: [],
    },
  ],
  labelWidth: "0px",
  itemStyle: {
    padding: "8px 0px",
    margin: 0,
  },
  colLayout: {
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  },
};
