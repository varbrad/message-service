require('./style.scss')

const Vue = require('vue')
const VueRouter = require('vue-router')
Vue.use(VueRouter)

const firebase = require('firebase')
const moment = require('moment')

firebase.initializeApp({
  apiKey: 'AIzaSyAYhsCV_G7fe-qEHK91wANRkdZTe30LafI',
  authDomain: 'message-service-72734.firebaseapp.com',
  databaseURL: 'https://message-service-72734.firebaseio.com',
  storageBucket: 'message-service-72734.appspot.com',
  messagingSenderId: '119536142331'
})

const database = firebase.database()

const app = new Vue({
  data: {
    messages: [],
    message: ''
  },
  methods: {
    postMessage: function () {
      let data = {
        message: this.message,
        timestamp: +new Date()
      }
      database.ref('/messages').push(data)
    },
    formatDatetime: function (timestamp) {
      return moment(timestamp).fromNow()
    }
  },
  mounted: function () {
    database.ref('/messages').on('child_added', (snapshot) => {
      this.messages.push(snapshot.val())
    })
  }
})

app.$mount('#app')