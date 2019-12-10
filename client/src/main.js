import Vue from 'vue'
import App from './App.vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { store } from './store/store'

let accessToken = ''
import axios from 'axios'
(() => {
  let requestApi = new XMLHttpRequest()
  requestApi.open("GET", 'http://localhost:8081/api', false)
  requestApi.send()
  accessToken = requestApi.responseText
})()

export const base = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Authorization : 'Bearer ' + accessToken
  },
  json: true
});
Vue.prototype.$http = base;

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import { routes } from './routes'
const router = new VueRouter({
  routes,
  mode: 'history',
});


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
