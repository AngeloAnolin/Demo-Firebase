<template>
  <div>
    <br />

    <div class="container">
      <button type="button" class="btn btn-outline-primary" @click="addNewRecord" v-if="!itemMode">Add New Record</button>
    </div>
    
    <br />

    <div class="container" v-if="!itemMode">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Team</th>
            <th scope="col">Player</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in appData" :key="d.key">
            <td>
              <button class="btn btn-info" @click="editRecord(d)">Edit</button>
              <button class="btn btn-danger" data-toggle="modal" data-target="#confirmModal" @click="deleteRecord(d)">Delete</button>
            </td>
            <td>{{ d.favoriteTeam }}</td>
            <td>{{ d.favoritePlayer }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="container" v-if="itemMode">
      <form>
        <div class="form-group">
          <label for="text1">Favorite Sports Team</label>
          <input type="text" maxlength="50" class="form-control" id="text1" aria-describedby="emailHelp" placeholder="Enter your favorite sports team" v-model="favoriteTeam">
        </div>
        <div class="form-group">
          <label for="">Favorite Player on Team</label>
          <input type="text" maxlength="50" class="form-control" id="text2" placeholder="Enter the name of your favorite player on the team" v-model="favoritePlayer">
        </div>
        <button class="btn btn-primary" @click.prevent="saveItem">Save</button>
        <button class="btn btn-warning" @click.prevent="cancelItem">Cancel</button>
      </form>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirm Delete</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this record?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="confirmProceed">Proceed</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import firebase from 'firebase'
  import { EventBus } from '../eventBus'

  export default {
    data () {
      return {
        firebaseDb: null,
        fireBaseRef: null,
        fireBaseItem: null,
        appData: [],
        itemMode: false,
        recordMode: '',
        favoriteTeam: '',
        favoritePlayer: ''
      }
    },

    methods: {
      addNewRecord () {
        var a = this
        a.favoriteTeam = ''
        a.favoritePlayer = ''
        a.itemMode = true
        a.recordMode = 'ADD'
      },

      cancelItem () {
        var a = this
        a.favoriteTeam = ''
        a.favoritePlayer = ''
        a.itemMode = false
      },

      editRecord (item) {
        var a = this
        a.fireBaseItem = item
        a.favoriteTeam = item.favoriteTeam
        a.favoritePlayer = item.favoritePlayer
        a.itemMode = true
        a.recordMode = 'EDIT'
      },

      deleteRecord (item) {
        var a = this
        a.fireBaseItem = item
      },

      confirmProceed () {
        var a = this
        var deleteItem = a.firebaseDb.ref(a.fireBaseItem.key)

        deleteItem.remove().then(function () {
          a.retrieveItems()
        })
          .catch(function (errr0) {
            console.log('Error Deleting Record.')
          })
      },

      saveItem () {
        var a = this
        if (a.recordMode === 'ADD') {
          var addItem = {
            favoriteTeam: a.favoriteTeam,
            favoritePlayer: a.favoritePlayer
          }

          a.fireBaseRef.push(addItem)
          a.retrieveItems()
          a.itemMode = false
        } else {
          var editItem = a.firebaseDb.ref(a.fireBaseItem.key)
          editItem.set({
            key: a.fireBaseItem.key,
            favoriteTeam: a.favoriteTeam,
            favoritePlayer: a.favoritePlayer
          })

          a.retrieveItems()
          a.itemMode = false
        }
      },

      retrieveItems () {
        var a = this
        a.appData.length = 0
        a.firebaseDb = firebase.database()
        a.fireBaseRef = a.firebaseDb.ref()
        a.fireBaseRef.once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapShot) {
            var obj = {
              key: childSnapShot.key,
              favoriteTeam: childSnapShot.val().favoriteTeam,
              favoritePlayer: childSnapShot.val().favoritePlayer
            }

            a.appData.push(obj)
          })
        })
      }
    },

    mounted () {
      var a = this
      var currentUser = firebase.auth().currentUser

      if (currentUser) {
        a.retrieveItems()

        EventBus.$on('loggedOff', (item) => {
          a.$router.push({path: 'login'})
        })
      } else {
        a.$router.push({path: 'login'})
      }
    }
  }
</script>
