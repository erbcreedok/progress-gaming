import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

export function createApp() {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
}

createApp()
