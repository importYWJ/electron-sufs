import { IForm } from "@/base-ui/form";
import { IInput } from "@/base-ui/input";

export const radarConfig: IForm = {
  formItems: [
    {
      type: "radio",
      field: "radarField",
      options: [
        {
          radioLabel: "Zh",
          value: "Zdr",
        },
        {
          radioLabel: "Zdr",
          value: "Zdr",
        },
        {
          radioLabel: "Kdp",
          value: "Kdp",
        },
      ],
    },
  ],
  colLayout: {
    xl: 8,
    lg: 8,
    md: 8,
    sm: 8,
    xs: 8,
  },
  itemStyle: {
    margin: "5px 0",
  },
};

export const detailTimeConfig: IForm = {
  formItems: [
    {
      type: "datepicker",
      field: "start_datetime",
      label: "起始时间",
      dateOptions: {
        type: "datetime",
      },
    },
    {
      type: "datepicker",
      field: "end_datetime",
      label: "结束时刻",
      dateOptions: {
        type: "datetime",
      },
    },
  ],
  labelWidth: "90px",
  itemStyle: {
    margin: "10px 0",
  },
  colLayout: {
    xl: 8,
    lg: 8,
    md: 8,
    sm: 8,
    xs: 8,
  },
};

export const timeResolutionConfig: IInput = {
  inputItems: [
    {
      field: "time_resolution",
      placeholder: "请输入时间分辨率...",
      hasAppend: true,
      appendValue: "分钟",
    },
  ],
  itemStyle: {
    margin: "10px 5px",
  },
};

export const ncResolutionConfig: IInput = {
  inputItems: [
    {
      field: "nc_resolution",
      placeholder: "请输入空间分辨率...",
      hasAppend: true,
      appendValue: "米",
    },
  ],
  itemStyle: {
    margin: "10px 5px",
  },
};

export const outputConfig: IInput = {
  inputItems: [
    {
      field: "output",
      placeholder: "请输入结果的存储名称...",
    },
  ],
  itemStyle: {
    margin: "10px 5px",
  },
};
