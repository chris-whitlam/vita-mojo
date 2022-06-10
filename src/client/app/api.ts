import axios from 'axios';

export function getStores() {
  return axios.get('/api/stores');
}
