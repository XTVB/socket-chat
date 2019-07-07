import Vue from 'vue';
import store from './store';
import App from './App.vue';
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

Vue.use(VueSocketio, io('https://demo-chat-server.on.ag/'), {store});

export default new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
