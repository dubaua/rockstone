import Vue from "vue";
import App from "./App.vue";
import Vue2TouchEvents from "vue2-touch-events";
import VueMq from "vue-mq";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueScrollTo from "vue-scrollto";
import "@/components/globals";
import store from "./store";
import "swiper/dist/css/swiper.css";
import "normalize.css";
import "./styles/main.scss";

Vue.use(Vue2TouchEvents);
Vue.use(VueMq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: Infinity
  }
});
Vue.use(VueAwesomeSwiper);
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
