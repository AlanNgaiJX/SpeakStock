import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/* 
  plugins
    - rem
    - cube-ui
*/
import CubeUnit from '@/common/cubeUnit';
import RemUnit from '@/common/remUnit';
Vue.use(CubeUnit);
Vue.use(RemUnit);

/* 
  css
*/
import '@/assets/css/common.css';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
