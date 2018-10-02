import Vue from "vue";
import App from "./App.vue";
import Vue2TouchEvents from "vue2-touch-events";
import VueMq from "vue-mq";
import VueAwesomeSwiper from "vue-awesome-swiper";
import VueScrollReveal from "vue-scroll-reveal";
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
Vue.use(VueScrollReveal, {
  duration: 1500,
  easing: "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
  distance: "32px",
  viewFactor: 0.3,
  mobile: false
});
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
