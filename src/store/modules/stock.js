import * as Api from "@/common/api.js";

import { stockFormater } from "@/common/formater.js";

const state = {
    stockStation: {
        stockCodes: ["sh601816"], //"sh000001"
        stockStore: []
    }
};

const getters = {
    translateStocksData: () => data => {
        var stocksList = data.split(";");
        var res = {};
        stocksList.pop();
        stocksList.forEach(item => {
            var item_key_data = item.split("=");
            var key = item_key_data[0].split("_").pop();
            var data = item_key_data[1].replace(/"/g, "").split(",");
            var dataObj = {};
            data.forEach((dataItem, index) => {
                var itemFormat = stockFormater.find(format => format.i === index);
                itemFormat && (dataObj[itemFormat.key] = dataItem);
            });
            dataObj[stockFormater[0].key] = key;
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
                    this.commit("stock/changeStockStore", transData);
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
    changeStockStore(state, data) {
        var stockStore = state.stockStation.stockStore;
        Object.keys(data).forEach(key => {
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
