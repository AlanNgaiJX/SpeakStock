import * as Api from "@/common/api.js";

const formater = [
    { i: -1, key: "stockCode", alias_zh: "股票代号" },
    { i: 0, key: "stockName", alias_zh: "股票名称" },
    { i: 1, key: "openingPrice", alias_zh: "今日开盘价" },
    { i: 2, key: "closingPrice", alias_zh: "昨日收盘价" },
    { i: 3, key: "presentPrice", alias_zh: "当前价格" },
    { i: 4, key: "topPrice", alias_zh: "今日最高价" },
    { i: 5, key: "bottomPrice", alias_zh: "今日最低价" },
    { i: 6, key: "buyingPrice1", alias_zh: "买一" },
    { i: 7, key: "sellingPrice1", alias_zh: "卖一" },
    { i: 8, key: "turnoverStocks", alias_zh: "成交量" },
    { i: 9, key: "turnoverPrice", alias_zh: "成交额" },
    { i: 30, key: "date", alias_zh: "日期" },
    { i: 31, key: "time", alias_zh: "时间" }
];

const state = {
    stockStation: {
        stockCodes: ["sh601816", "sh000001"],
        stockStore:[]
    }
};

const getters = {
    translateStocksData: () => data => {
        // split Item

        var stocksList = data.split(";");
        var res = {};
        stocksList.pop();
        stocksList.forEach(item => {
            var item_key_data = item.split("=");
            var key = item_key_data[0].split("_").pop();
            var data = item_key_data[1].replace(/"/g, "").split(",");
            var dataObj = {};
            data.forEach((dataItem, index) => {
                var itemFormat = formater.find(format => format.i === index);
                itemFormat && (dataObj[itemFormat.key] = dataItem);
            });
            dataObj[formater[0].key] = key;
            res[key] = dataObj;
        });

        return res;
    }
};

var actions = {
    getStocks({ state, getters, commit }) {
        Api.getStockByCodes(state.stockStation.stockCodes)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    var transData = getters.translateStocksData(res.data);
                    this.commit('stock/changeStockStore',transData);
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch(err => {
                console.warn(err);
            });
    }
};

const mutations = {
    changeStockStore(state,data){
      var stockStore = state.stockStation.stockStore;
      Object.keys(data).forEach(key=>{
        var stockInfo = data[key];
        !stockStore[key] && (stockStore[key] = []);
        stockStore[key].push(stockInfo);
      });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
