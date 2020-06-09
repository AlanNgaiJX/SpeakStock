import Vue from "vue";
import Vuex from "vuex";

import stock from "@/store/modules/stock";

Vue.use(Vuex);

const state = {};

const getters = {};

const actions = {
  test(){
    console.log("???");
    
  }
};

const mutations = {};

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    stock
  }
});
