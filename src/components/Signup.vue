<<template>
  <div>
    <form>
      <div class="form-group">
        <label for="emailAddress">Email address</label>
        <input type="email" class="form-control" id="emailAddress" placeholder="Email" v-model="emailAddress">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password" v-model="password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" class="form-control" id="confirmPassword" placeholder="Re-enter Password" v-model="confirmPassword">
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="signupClicked">Register</button>
      <p>
        Already have an account? Proceed to the <router-link class="navbar-item" to="/login">Login</router-link> page.
      </p>

      <div class="alert alert-success" role="alert" v-if="showAlertSuccess">
        User successfully registered. You may now proceed to the <router-link class="navbar-item" to="/login">Login</router-link> page.
        <button type="button" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="alert alert-warning" role="alert" v-if="showAlertWarning">
        <button type="button" class="close" aria-label="Close" @click="closeAlertWarning">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="alert-heading">Validation Error</h4>
        <p>{{ warningMessage }}</p>
      </div>

      <div class="alert alert-danger" role="alert" v-if="showAlertDanger">
        <button type="button" class="close" aria-label="Close" @click="closeAlertDanger">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="alert-heading">Registration Error</h4>
        <p>{{ errorMessage }}</p>
      </div>
    </form>
  </div>
</template>

<<script>
  import firebase from 'firebase'

  export default {
    data () {
      return {
        emailAddress: '',
        password: '',
        confirmPassword: '',
        showAlertSuccess: false,
        showAlertWarning: false,
        showAlertDanger: false,
        errorMessage: null
      }
    },

    methods: {
      closeAlertWarning () {
        var a = this
        a.showAlertWarning = false
      },

      closeAlertDanger () {
        var a = this
        a.showAlertDanger = false
        a.errorMessage = null
      },

      signupClicked () {
        var a = this

        if (a.emailAddress.trim() === '' || a.password.trim() === '' || a.confirmPassword.trim() === '') {
          a.showAlertWarning = true
          a.warningMessage = 'Email Address / Password / Confirm Password field(S) cannot be blank.'
          return
        }

        if (a.password.trim() !== a.confirmPassword.trim()) {
          a.showAlertWarning = true
          a.warningMessage = 'Passwords does not match.'
          return
        }

        if (a.password === a.confirmPassword) {
          firebase.auth().createUserWithEmailAndPassword(a.emailAddress, a.password).then(
            function (user) {
              a.showAlertSuccess = true
            },
            function (err) {
              if (err) {
                a.showAlertDanger = true
                a.errorMessage = err.message
              }
            }
          )
        }
      }
    }
  }
</script>
