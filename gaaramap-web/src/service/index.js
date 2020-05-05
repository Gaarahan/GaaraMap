import axios from 'axios';
const service = axios.create({
  baseURL: 'https://www.gaarahan.cn:8088',
  withCredentials: true
});

export default {
  signIn (mes) {
    return service.post(`/account/sign-in`, mes)
  },
  login (mes) {
    return service.post(`/account/login`, mes)
  },
  logout () {
    return service.get('/account/logout')
  },
  fetchUserInfo () {
    return service.get('/account/get-info')
  }
}
