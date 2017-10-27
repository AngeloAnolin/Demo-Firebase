<<template>
  <div>
    <form>
      <div class="form-group">
        <label for="emailAddress">Email address</label>
        <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" v-model="emailAddress">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="loginClicked">Login</button>
      <p>
        Don't have an account yet? Head over to the <router-link class="navbar-item" to="/signup">Sign Up</router-link> page to register.
      </p>

      <div class="alert alert-danger" role="alert" v-if="showAlertDanger">
        <button type="button" class="close" aria-label="Close" @click="closeAlertDanger">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="alert-heading">Login Error</h4>
        <p>{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import { EventBus } from '../eventBus'

  export default {
    data () {
      return {
        emailAddress: '',
        password: '',
        showAlertDanger: false,
        errorMessage: null
      }
    },

    methods: {
      loginClicked () {
        var a = this
        firebase.auth().signInWithEmailAndPassword(a.emailAddress, a.password).then(
          function (user) {
            // Set the user credentials in localstorage.
            localStorage.setItem('firebase-demo-user', user.email)
            a.$router.push('home')
            EventBus.$emit('loggedIn', true)
          },
          function (err) {
            if (err) {
              a.showAlertDanger = true
              a.errorMessage = err.message
            }
          }
        )
      },

      closeAlertDanger () {
        var a = this
        a.showAlertDanger = false
        a.errorMessage = null
      }
    },

    mounted () {
      var a = this
      var currentUser = firebase.auth().currentUser
      if (currentUser) {
        a.$router.push({path: 'home'})
      }
    }
  }
</script>
