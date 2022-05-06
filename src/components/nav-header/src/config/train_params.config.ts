import { IForm } from "@/base-ui/form";
import { IInput } from "@/base-ui/input";

export const superParamsConfig: IInput = {
  inputItems: [
    {
      field: "bacth_size",
      label: "训练批次：",
      placeholder: "请输入批大小...",
    },
    {
      field: "epoches",
      label: "迭代次数：",
      placeholder: "请输入迭代次数...",
    },
    {
      field: "learning_rate",
      label: "学习率：",
      placeholder: "请输入学习率...",
    },
    {
      field: "dropout_rate",
      label: "丢弃比例：",
      placeholder: "请输入丢弃比例...",
    },
  ],
  itemStyle: {
    margin: "10px 0",
  },
  labelWidth: "120px",
};
