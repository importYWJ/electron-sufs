<template>
  <div class="wj-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      :label-width="labelWidth"
      :label-position="labelPosition"
      :disabled="disable"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @input="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'radio'">
                <el-radio-group
                  :model-value="modelValue[`${item.field}`]"
                  @change="handleValueChange($event, item.field)"
                >
                  <el-radio
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.radioLabel"
                  ></el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  filterable
                  clearable
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @change="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.title"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.dateOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @change="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
              <template v-else-if="item.type === 'timepicker'">
                <el-time-picker
                  v-bind="item.timeOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @change="handleValueChange($event, item.field)"
                ></el-time-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { IFormItem } from "@/base-ui/form/types";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
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
      default: () => ({ padding: "10px 40px" }),
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
      deafult: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue });
    // watch(
    //   formData,
    //   (newValue) => {
    //     emit("update:modelValue", newValue);
    //   },
    //   {
    //     deep: true,
    //   }
    // );
    const handleValueChange = (value: any, field: string) => {
      console.log("form控件调用事件");

      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    return { handleValueChange };
  },
});
</script>

<style scoped lang="less">
// .wj-form {
//   padding-top: 18px;
// }
</style>
