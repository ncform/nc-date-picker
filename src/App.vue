<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="your-form-name"
      v-model="formSchema.value"
      @submit="submit()"
    ></ncform>
    <hr />
    <pre>
      {{JSON.stringify(formSchema.value, null, 2)}}
    </pre>
    <el-button @click="submit()">Submit</el-button>
  </div>
</template>

<script>
import NcDatePicker from "./components";

export default {
  created() {
    this.$ncformAddWidget({ name: "nc-date-picker", widget: NcDatePicker });
  },
  data() {
    return {
      formSchema: {
        type: "object",
        properties: {
          strDemo: {
            type: "string",
            ui: {
              widget: "nc-date-picker",
              widgetConfig: {
                type: 'datetime',
                valueFormat: 'yyyy-MM-dd HH:mm:ss'
              }
            }
          },
          numDemo: {
            type: "number",
            value: +new Date(),
            ui: {
              widget: "nc-date-picker",
              widgetConfig: {
                type: 'datetime',
                valueFormat: 'timestamp',
                valueDigits: 10
              }
            }
          }
        },
        value: {}
      }
    };
  },
  methods: {
    submit() {
      this.$ncformValidate("your-form-name").then(data => {
        if (data.result) {
          console.log(this.$data.formSchema.value);
        }
      });
    }
  }
};
</script>
