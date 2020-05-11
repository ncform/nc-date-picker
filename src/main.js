import Vue from "vue";
import vueNcform from "@ncform/ncform";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ncformStdComps from "@ncform/ncform-theme-elementui";
import axios from "axios";

import App from "./App.vue";

Vue.use(Element);
Vue.use(vueNcform, { extComponents: ncformStdComps /*lang: 'zh-cn'*/ });
window.$http = Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
