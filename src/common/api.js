import axios from 'axios';
import hostConfig from '@/common/host.config.js'

const dev = true;
const Axios = axios.create({});

var host_1;

if (dev) {
  host_1 = hostConfig.host_1.alias;
}else{
  host_1 = hostConfig.host_1.target;
}




// codes sz002307
export function getStockByCodes(codes) {
  return Axios.get(host_1 + `/list=${codes.join(',')}`);
}
