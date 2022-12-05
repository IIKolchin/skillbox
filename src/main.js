import Vue from 'vue';
import { greetings, study } from './constants';
import alertFunc from './function';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

alertFunc(greetings);
alertFunc(study);
