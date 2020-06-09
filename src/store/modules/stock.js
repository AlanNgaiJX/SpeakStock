import * as Api from "@/common/api.js";

const state = {
  stockStation: {
    stockCodes: ["sh601816"]
  }
};

const getters = {};

var actions = {
  getStocks({ state }) {
    Api.getStockByCodes(state.stockStation.stockCodes).then(res => {
      console.log(res);
    });
  },

  test() {
    console.log("hello");
  }
};

const mutations = {
  test() {
    console.log("test");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
