<template>
  <nav class="navbar navbar-light bg-light">
    <router-link class="navbar-item" to="/">
        <i class="fa fa-home"></i>
        <h1>Firebase Demo</h1>
      </router-link>
      <div class="form-inline" v-if="userLoggedIn">
        <button class="btn btn-outline-info my-2 my-sm-0" @click="logout">Logout</button>
      </div>
  </nav>
</template>

<script>
  import { EventBus } from '../eventBus'
  import firebase from 'firebase'

  export default {
    name: 'navigationbar',

    data () {
      return {
        isActive: false,
        userLoggedIn: false,
        userName: null
      }
    },

    methods: {
      logout () {
        firebase.auth().signOut().then(() => {
          var a = this
          a.userLoggedIn = false
          localStorage.removeItem('firebase-demo-user')
          EventBus.$emit('loggedOff', true)
        })
      }
    },

    mounted () {
      var a = this
      EventBus.$on('loggedIn', (item) => {
        a.userLoggedIn = item
      })
    }
  }
</script>
