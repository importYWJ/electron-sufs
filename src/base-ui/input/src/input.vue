<template>
  <el-form :label-width="labelWidth" :label-position="labelPosition">
    <el-row>
      <template v-for="item in inputItems" :key="item.field">
        <el-col>
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
          >
            <div class="inputItem">
              <template v-if="item.hasButton">
                <el-input
                  :placeholder="item.placeholder"
                  :model-value="modelValue[`${item.field}`]?.path ?? ''"
                  :disabled="disable"
                >
                </el-input>
                <el-button class="upload" type="primary">
                  {{ item.btnName }}
                  <input
                    type="file"
                    :accept="item.accept"
                    @change="handleFileChange($event.target, item.field)"
                  />
                </el-button>
              </template>
              <template v-else>
                <el-input
                  :placeholder="item.placeholder"
                  :model-value="modelValue[`${item.field}`]"
                  @input="handleValueChange($event, item.field)"
                  :disabled="disable"
                  clearable
                >
                  <template v-if="item.hasAppend" #append>
                    {{ item.appendValue }}
                  </template>
                  <template v-if="item.hasPrepend" #prepend>
                    {{ item.appendValue }}
                  </template>
                </el-input>
              </template>
            </div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { IInputItem } from "@/base-ui/input/types";
// import type { UploadUserFile } from "element-plus";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    inputItems: {
      type: Array as PropType<IInputItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "0px",
    },
    labelPosition: {
      type: String,
      default: "right",
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 20px" }),
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
    disable: {
      type: Boolean,
      default: false,
    },
    // action: {
    //   type: String,
    //   required: true,
    // },
    // fileList: {
    //   type: Array as PropType<any[]>,
    //   default: () => [],
    // },
    // accept: {
    //   type: String,
    //   deafult: "",
    // },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const filesValue = computed(() => {
      return props.modelValue;
    });
    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    const handleFileChange = (inputEl: HTMLInputElement, field: string) => {
      const file = inputEl?.files;
      if (file !== null) {
        emit("update:modelValue", {
          ...props.modelValue,
          [field]: { file: file[0], path: file[0].path },
        });
      }
    };
    return { handleValueChange, handleFileChange, filesValue };
  },
});
</script>

<style scoped lang="less">
.inputItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  .el-input {
    padding-right: 10px;
  }
  .el-button {
    width: 150px;
  }
  .upload {
    position: relative; // 关键
    overflow: hidden; // 关键
  }
  input[type="file"] {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0; // 关键(隐藏字体)
    cursor: pointer;
  }
}
</style>
