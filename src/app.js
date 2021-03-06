import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'
import {sync} from 'vuex-router-sync'
import { routes } from './system/routes'
import store from './store/index'
import Notifications from 'vue-notification'

Vue.use(VueRouter );
Vue.use(Notifications);

export const router = new VueRouter({
    mode: 'history',
    routes
});

sync(store, router);

new Vue({
  el: '#app',
    store,
    router,
  render: h => h(app)
});
