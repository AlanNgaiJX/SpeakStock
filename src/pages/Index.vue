<template>
    <div id="Home">
        <input type="text" v-model="stockCode" />

        <div class="btn-group">
            <div class="btn btn-start" @click="startListen">开始侦听</div>
            <div class="btn btn-end" @click="stopListen">停止监听</div>
        </div>

        <div class="stockBoard">
            <div class="stockInfo">
                <div class="stockName">xxxx</div>
                <div class="stockNum">12345</div>
            </div>

            <div class="price-data-wrap">
                <ul class="price-data-list">
                    <li class="price-data-item">
                        <div class="price-data-label">当前价格：</div>
                        <div class="price-data-content">12.22</div>
                    </li>
                    <li class="price-data-item">
                        <div class="price-data-label">今日开盘价：</div>
                        <div class="price-data-content">50.22</div>
                    </li>
                    <li class="price-data-item">
                        <div class="price-data-label">昨日收盘价：</div>
                        <div class="price-data-content">50.22</div>
                    </li>
                    <li class="price-data-item">
                        <div class="price-data-label">今日最高价</div>
                        <div class="price-data-content">50.22</div>
                    </li>
                    <li class="price-data-item">
                        <div class="price-data-label">今日最低价</div>
                        <div class="price-data-content">50.22</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            stockCode: "",
            interval: null
        };
    },
    methods: {
        startListen() {
            if (this.interval) return;
            this.interval = setInterval(() => {
                this.$store.dispatch("stock/getStocks");
            }, 1000);
        },

        stopListen() {
            clearInterval(this.interval);
        }
    },
    mounted() {}
};
</script>

<style lang="scss">
#Home {
    .btn-group {
        display: flex;
        justify-content: center;

        .btn {
            background-color: pink;
            width: 1.8rem;
            height: 0.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.1rem;
            color: #ffffff;
            font-size: 0.28rem;
        }
    }

    .stockBoard {
        font-size: 0.28rem;
        padding: 0.3rem;
        .stockInfo {
            display: flex;
            font-weight: bold;

            .stockName {
                margin-right: 0.1rem;
            }

            .stockNum {
            }
        }
    }

    .price-data-wrap {
        border: 1px solid black;
        margin-top: 0.3rem;
        padding: 0.1rem;

        .price-data-list {
            .price-data-item {
                margin-top: 0.1rem;
                display: flex;
            }
        }
    }
}
</style>
