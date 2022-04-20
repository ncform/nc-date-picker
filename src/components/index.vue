<template>
  <el-date-picker
    class="ncform-date-picker"
    v-if="type && typeOptions[type]"
    :placeholder="placeholder || $nclang(typeOptions[type].placeholder)"
    :disabled="disabled"
    :readonly="readonly"
    :size="mergeConfig.size"
    :clearable="mergeConfig.clearable"
    v-show="!hidden"
    v-model="pickerVal"
    :type="type"
    :format="mergeConfig.format || $nclang(typeOptions[type].format)"
    :value-format="mergeConfig.valueFormat"
  >
  </el-date-picker>
</template>

<style lang="scss">
.h-layout {
  .ncform-date-picker {
    &.__ncform-control {
      clear: none;
    }
  }
}
.v-layout {
  .ncform-date-picker {
    &.__ncform-control {
      clear: both;
    }
  }
}
.ncform-date-picker {
  &.el-date-editor.el-input {
    width: 100%;
  }
}
</style>

<script>
import ncformCommon from "@ncform/ncform-common";
import { formatDate } from "element-ui/src/utils/date-util";
const controlMixin = ncformCommon.mixins.vue.controlMixin;
export default {
  mixins: [controlMixin],
  i18nData: {
    en: {
      chYear: "Choose Year",
      chMonth: "Choose Month",
      chDate: "Choose Date",
      chWeek: "Choose Week",
      chTime: "Choose Datetime",
      weekFormat: "Week WW of yyyy"
    },
    zh_cn: {
      chYear: "选择年份",
      chMonth: "选择月份",
      chDate: "选择日期",
      chWeek: "选择周",
      chTime: "选择时间",
      weekFormat: "yyyy年 第WW周"
    }
  },
  props: {
    value: {
      type: [String, Number]
    }
  },
  watch: {
    pickerVal(newv) {
      this.modelVal = this._processModelVal(newv);
    }
  },
  mounted() {
    if (this.$data.modelVal !== undefined) {
      this.$data.modelVal = this.mergeConfig.valueFormat
        ? // modelVal is not changed. So we have to manually call it.
          // so that the valueDigits logic works.
          this._processModelVal(this.$data.modelVal)
        : new Date(parseInt(this.$data.modelVal));
    }

    let pickerVal = this.$data.modelVal;
    // It's may be a timestamp value
    if (typeof pickerVal === "number" || !isNaN(pickerVal)) {
      if (
        this.mergeConfig.valueFormat === "timestamp" &&
        typeof this.mergeConfig.valueDigits === "number" &&
        this.mergeConfig.valueDigits < 13
      ) {
        pickerVal =
          this.$data.modelVal * Math.pow(10, 13 - this.mergeConfig.valueDigits);
      }
    } else if (!pickerVal) {
      // NaN / null / undefined
      // Return NaN for picker value will cause a date-picker date loop
      pickerVal = "";
    }
    this.pickerVal = pickerVal;
  },
  data() {
    return {
      pickerVal: "",
      typeOptions: {
        year: {
          format: "",
          placeholder: "chYear"
        },
        month: {
          format: "",
          placeholder: "chMonth"
        },
        date: {
          format: "",
          placeholder: "chDate"
        },
        week: {
          format: "weekFormat",
          placeholder: "chWeek"
        },
        datetime: {
          format: "",
          placeholder: "chTime"
        }
      },
      // 组件特有的配置属性
      defaultConfig: {
        clearable: false,
        type: "date", // year/month/date/week/datetime
        format: "",
        valueFormat: "",
        size: "",
        valueDigits: 13 // 当 valueFormat 为 timestamp 时指定输出数字时间的位数
      }
      // modelVal：请使用该值来绑定实际的组件的model
    };
  },
  computed: {
    // disabled / readonly / hidden / placeholder 你可以直接使用这些变量来控制组件的行为
    type() {
      if (!this.$data.typeOptions[this.mergeConfig.type]) {
        return "date";
      } else {
        return this.mergeConfig.type;
      }
    }
  },
  methods: {
    // 你可以通过该方法在modelVal传出去之前进行加工处理，即在this.$emit('input')之前
    _processModelVal(newVal) {
      const { valueFormat, valueDigits } = this.mergeConfig;
      if (valueFormat !== "timestamp") {
        // See: https://github.com/ElemeFE/element/blob/dc8bdc021e0149b8947bda826b5ee3b67be30ed7/packages/date-picker/src/picker.vue#L523-L537
        // And https://github.com/ElemeFE/element/blob/dc8bdc021e0149b8947bda826b5ee3b67be30ed7/packages/date-picker/src/picker.vue#L139-L142
        // If value Format='yyyyMMdd' but pickerValue is a timestamp value. then will cause an error
        if (typeof newVal === "number") {
          return formatDate(newVal, valueFormat);
        }
        return `${newVal ? (valueFormat ? newVal : +new Date(newVal)) : ""}`;
      }
      // When click clear datepicker, newVal will be null, and cause the loop again
      if (isNaN(newVal)) {
        return "";
      }
      if (valueFormat === "timestamp") {
        return +(newVal + "").substring(0, valueDigits);
      }
      return newVal;
    }
  }
};
</script>
