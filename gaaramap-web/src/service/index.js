import axios from 'axios';
import {SERVER_URL} from "../constants";

const service = axios.create({
  baseURL: SERVER_URL,
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
  },
  editPassword (mes) {
    return service.post('/account/edit-password', mes)
  },
  editUsername (mes) {
    return service.post('/account/edit-username', mes)
  },
  addFriend (mes) {
    return service.post('/friend/add-friend', mes)
  },
  approveFriend (name) {
    return service.get(`/friend/approve-friend?name=${name}`)
  },
  rejectFriend (name) {
    return service.get(`/friend/reject-friend?name=${name}`)
  }
}
