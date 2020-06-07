import * as Api from '@/common/api.js';

const state = {
  stockStation: {
    stockCodes:['sh601816']
  }
};

const getters = {};

const acitons = {
  getStocks({ state }, { stockCodes }) {
    Api.getStockByCodes(state.stockCodes).then(res=>{
      console.log(res);
    })
  },
  test(){
    console.log("hello");
    
  }
};

const mutations = {};

export default {
  namespace: true,
  state,
  getters,
  acitons,
  mutations
};
