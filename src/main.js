// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import router from './router'
import firebase from 'firebase'

import NavigationBar from './components/NavigationBar'

Vue.config.productionTip = false
Vue.use(Router)

var config = {
  apiKey: 'AIzaSyDpSVnaXktJRZS-gxULSH90tZAWUOrOIvE',
  authDomain: 'luminous-fire-9516.firebaseapp.com',
  databaseURL: 'https://luminous-fire-9516.firebaseio.com',
  projectId: 'luminous-fire-9516',
  storageBucket: 'luminous-fire-9516.appspot.com',
  messagingSenderId: '499335793383'
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  template: `
  <div>
    <navigation-bar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
  `,
  router,
  components: {
    NavigationBar
  }
}).$mount('#app')
