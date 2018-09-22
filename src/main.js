import Vue from "vue";
import App from "./App.vue";
import Vue2TouchEvents from "vue2-touch-events";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "@/components/globals";
import store from "./store";
import "swiper/dist/css/swiper.css";
import "normalize.css";
import "./styles/main.scss";

Vue.use(Vue2TouchEvents);

Vue.use(VueAwesomeSwiper /* { default global options } */);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
