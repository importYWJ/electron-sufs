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
              <template v-if="item.hasButton">
                <!-- <el-upload> -->
                <el-button type="primary" :disabled="disable">
                  {{ item.btnName }}
                </el-button>
                <!-- </el-upload> -->
              </template>
            </div>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IInputItem } from "@/base-ui/input/types";
import { dialog, remote } from "electron";

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
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    const btnClick = () => {
      remote.dialog
        .showOpenDialog({
          properties: ["openFile", "openDirectory"],
        })
        .then((result) => {
          console.log(result.canceled);
          console.log(result.filePaths);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return { handleValueChange };
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
}
</style>
