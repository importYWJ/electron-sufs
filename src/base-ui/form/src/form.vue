<template>
  <div class="wj-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      :label-width="labelWidth"
      :label-position="labelPosition"
      :disabled="disable"
      :model="modelValue"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :prop="item.field"
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
                    :value="option.value"
                    :label="option.label"
                  >
                    {{ option.label }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <date-time-picker
                  :type="item.type"
                  :options="item.dateOptions"
                  @change="handleValueChange($event, item.field)"
                ></date-time-picker>
              </template>
              <template v-else-if="item.type === 'timepicker'">
                <date-time-picker
                  :type="item.type"
                  :options="item.dateOptions"
                  @change="handleValueChange($event, item.field)"
                ></date-time-picker>
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
import { defineComponent, PropType } from "vue";
import { IFormItem } from "@/base-ui/form/types";
import DateTimePicker from "./date_time_picker.vue";

export default defineComponent({
  components: { DateTimePicker },
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
    const handleValueChange = (value: any, field: string) => {
      console.log(value, field);
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    return { handleValueChange };
  },
});
</script>

<style scoped lang="less">
.date-time-picker {
  display: flex;
  width: 100%;
  flex-grow: 1;
}
</style>
