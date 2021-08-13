import axios from 'axios'
import Vue from 'vue'

const http = axios.create();
const baseURL = 'http://localhost:8082'
http.defaults.baseURL = baseURL
http.defaults.timeout = 50000;
http.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
http.withCredentials = true

http.interceptors.request.use(
  config => {
    config.headers.token = Vue.$cookies.get("wnwtoken");
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  http
}