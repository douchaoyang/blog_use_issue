import Vue from "vue";
import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import lodash from "lodash";
import moment from "moment";
import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown.css";

import App from "./App";
import store from "./store";
import router from "./router";
import "./css/main.css";

import { gitHubApi, isGetUserInfo, queryParse, queryStringify } from "./utils";

moment.locale("zh-cn");
Vue.prototype._ = lodash;
Vue.prototype.$moment = moment;
Vue.prototype.$http = axios;
Vue.prototype.$highlight = highlight;
Vue.prototype.$gitHubApi = gitHubApi;
Vue.prototype.$isGetUserInfo = isGetUserInfo;
Vue.prototype.$queryParse = queryParse;
Vue.prototype.$queryStringify = queryStringify;

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return Vue.prototype.$highlight.highlightAuto(code).value;
  },
});
Vue.prototype.$marked = marked;

const vm = new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App },
});

// request拦截器
axios.interceptors.request.use(
  (config) => {
    let isGetUserInfo = vm.$isGetUserInfo(vm, config);
    if (!isGetUserInfo) {
      NProgress.start();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response拦截器
axios.interceptors.response.use(
  (response) => {
    let isGetUserInfo = vm.$isGetUserInfo(vm, response.config);
    if (isGetUserInfo) {
      return response;
    } else {
      setTimeout(() => {
        NProgress.done();
      }, 500);
      return response;
    }
  },
  (error) => {
    let isGetUserInfo = vm.$isGetUserInfo(vm, error.config);
    if (!isGetUserInfo) {
      NProgress.done();

      if (error.response) {
        if (error.response.status === 401) {
          alert("登录信息已过期，请重新登录!");
        } else if (error.response.status === 403) {
          alert("您操作的太频繁，请稍后再试!");
        } else if (error.response.statusText) {
          alert(error.response.status + " " + error.response.statusText);
        }
      }
    }

    return Promise.reject(error);
  }
);
