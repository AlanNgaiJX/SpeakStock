import axios from 'axios';

const Axios = axios.create({});

// codes sz002307
function getStockByCodes(codes) {
  return Axios.get(`http://hq.sinajs.cn/list=${codes.join(',')}`);
}

export default {
  getStockByCodes,
};
