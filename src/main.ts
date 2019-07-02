import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {},
});

Vue.use(VueSocketio, io('https://demo-chat-server.on.ag/'));

const app = new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');




// TODO remove - for debugging
interface Window {
    app: Vue;
}

declare var window: Window;

window.app = app;
