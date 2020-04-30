import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import cart from "./modules/cart";
import products from "./modules/product";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // = data
  },
  getters: {
    // = computed properties
  },
  modules: {
    cart,
    products
  },
  actions,
  mutations: {}
});
