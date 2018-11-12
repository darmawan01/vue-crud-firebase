// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import Vuelidate from 'vuelidate'
import DateParse from './utils/date'
import * as firebase from 'firebase'
import Alert from './components/global/Alert'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.component('my-alert', Alert)

Vue.config.productionTip = false

Vue.filter('date', DateParse)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCOW7HslyDOmpzNA1Rod0U0Fd3t4IqB2v8',
      authDomain: 'test-41180.firebaseapp.com',
      databaseURL: 'https://test-41180.firebaseio.com',
      projectId: 'test-41180',
      storageBucket: 'test-41180.appspot.com',
      messagingSenderId: '792936312744'
    })
    this.$store.dispatch('loadMeetup')
  }
})
