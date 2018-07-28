<template>
  <div class="addButton">
    <!-- {{seenmodal}} -->
    <div v-if="seenmodal">
      <a class="waves-effect waves-light btn modal-trigger" href="#modal1" @click="seenmodal=false">Add Task</a>
    </div>
    <div id="modal1" class="modal" style="display:block; position:absolute" v-else>
      <div class="modal-content">
      <h4>Modal Header</h4>
      task:
      <input type="text" v-model='task' id="task">
      description:
      <input type="text" v-model='description' id="description">
      point:
      <input type="text" v-model='point' id="point">
      assign:
      <input type="text" v-model='assign' id="assign">
      </div>
      <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" @click="seenmodal=true">Cancel</a>
      <a class="modal-close waves-effect waves-green btn-flat" @click="addTask">Save</a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'addButton',
  data () {
    return {
      task: '',
      description: '',
      assign: '',
      point: '',
      seenmodal: true
    }
  },
  created () {
    var config = {
      apiKey: 'AIzaSyBXLtOyXYEUDAD5XbtvexSCT9yLwzmHUMQ',
      authDomain: 'kanban-e829b.firebaseapp.com',
      databaseURL: 'https://kanban-e829b.firebaseio.com',
      // projectId: 'kanban-e829b',
      storageBucket: 'kanban-e829b.appspot.com'
      // messagingSenderId: '909020042313'
    }
    firebase.initializeApp(config)
  },
  methods: {
    addTask: function () {
      swal({
        title: "Are you sure save this task?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willSave) => {
        if (willSave) {
          var database = firebase.database()
          var postsRef = database.ref('kanban')
          var newPostRef = postsRef.push({
            task: this.task,
            description: this.description,
            point: this.point,
            assign: this.assign,
            status: 'backlog'
          })
          this.seenmodal = true
          this.task = ''
          this.description = ''
          this.assign = ''
          this.point = ''
          this.$router.push('/')
          swal("Your task has been saved!", {
            icon: "success",
          });
        }else{
            swal("cancled")
        }
      });

    }
  }
}
</script>
