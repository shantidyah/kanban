<template>
    <div class="show">
      <!-- {{todo}} -->
      <!-- {{seenCard}} -->
      <div class="row">
        <div class="col s3 m3" id="backlog">
            <ul class="collapsible" style="padding-right: 5px"  @click="seenCard=false">
              <li>
                <div class="collapsible-header"><i class="material-icons">event_note</i>BACKLOG</div>
                <div v-if="seenCard"></div>
                <div class="collapsible-body" style="display:block" v-else>
                  <span>
                    <div class="row" v-for="task in backlog" v-bind:key="task[key]">
                      <div class="col s12 m12">
                        <div class="card" style="position:static;">
                          <div class="card-content">
                            <p class='headerCard'>{{task.task}}</p><br>
                            <div class='content-task' style="text-align:left; line-height: 2em;">
                              <p><b>Description: </b>{{task.description}}</p>
                              <p><b>Point: </b>{{task.point}}</p>
                              <p><b>Assign to: </b>{{task.assign}}</p>
                            </div>
                          </div>
                          <div class="card-action" style="position:static;">
                            <!-- <button><i class="material-icons">arrow_back</i></button> -->
                            <button @click="deleteTask(task.id,task.task)"><i class="material-icons">delete</i></button>
                            <button @click="changeTodo(task.id)"><i class="material-icons">arrow_forward</i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </li>
            </ul>
        </div>

        <div class="col s3 m3" id="todo">
          <ul class="collapsible" style="padding-right: 5px"  @click="seenCard=false">
            <li>
              <div class="collapsible-header"><i class="material-icons">event_note</i>TODO</div>
              <div v-if="seenCard"></div>
              <div class="collapsible-body" style="display:block;" v-else>
                <span>
                  <div class="row" v-for="task in todo" v-bind:key="task[key]">
                    <div class="col s12 m12">
                      <div class="card" style="position:static;">
                        <div class="card-content">
                          <p class='headerCard'>{{task.task}}</p><br>
                          <div class='content-task' style="text-align:left; line-height: 2em;">
                            <p><b>Description: </b>{{task.description}}</p>
                            <p><b>Point: </b>{{task.point}}</p>
                            <p><b>Assign to: </b>{{task.assign}}</p>
                          </div>
                        </div>
                        <div class="card-action" style="position:static;">
                          <button @click="changeBacklog(task.id)"><i class="material-icons">arrow_back</i></button>
                          <button @click="deleteTask(task.id,task.task)"><i class="material-icons">delete</i></button>
                          <button @click="changeDoing(task.id)"><i class="material-icons">arrow_forward</i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div class="col s3 m3" id="doing">
          <ul class="collapsible" style="padding-right: 5px"  @click="seenCard=false">
            <li>
              <div class="collapsible-header"><i class="material-icons">event_note</i>DOING</div>
              <div v-if="seenCard"></div>
              <div class="collapsible-body" style="display:block" v-else>
                <span>
                  <div class="row" v-for="task in doing" v-bind:key="task[key]">
                    <div class="col s12 m12">
                      <div class="card" style="position:static;">
                        <div class="card-content">
                          <p class='headerCard'>{{task.task}}</p><br>
                          <div class='content-task' style="text-align:left; line-height: 2em;">
                            <p><b>Description: </b>{{task.description}}</p>
                            <p><b>Point: </b>{{task.point}}</p>
                            <p><b>Assign to: </b>{{task.assign}}</p>
                          </div>
                        </div>
                        <div class="card-action" style="position:static;">
                          <button @click="changeTodo(task.id)"><i class="material-icons">arrow_back</i></button>
                          <button @click="deleteTask(task.id,task.task)"><i class="material-icons">delete</i></button>
                          <button @click="changeDone(task.id)"><i class="material-icons">arrow_forward</i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div class="col s3 m3" id="done">
          <ul class="collapsible" style="padding-right: 5px" @click="seenCard=false">
            <li>
              <div class="collapsible-header"><i class="material-icons">event_available</i>DONE</div>
              <div v-if="seenCard"> </div>
              <div class="collapsible-body" style="display:block" v-else>
                <span>
                  <div class="row" v-for="task in done" v-bind:key="task[key]">
                    <div class="col s12 m12">
                      <div class="card" style="position:static;">
                        <div class="card-content">
                          <p class='headerCard'>{{task.task}}</p><br>
                          <div class='content-task' style="text-align:left; line-height: 2em;">
                            <p><b>Description: </b>{{task.description}}</p>
                            <p><b>Point: </b>{{task.point}}</p>
                            <p><b>Assign to: </b>{{task.assign}}</p>
                          </div>
                        </div>
                        <div class="card-action" style="position:static;">
                          <button @click="changeDoing(task.id)"><i class="material-icons">arrow_back</i></button>
                          <button @click="deleteTask(task.id,task.task)"><i class="material-icons">delete</i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<style>
  .headerCard{
    text-transform: uppercase;
    font-size: 25px;
    font-weight: bold;
  }
</style>

<script>
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'show',
  data () {
    return {
      kanban: '',
      seenCard: true,
      task: ''
    }
  },
  created () {
    this.listTask()
  },
  computed: {
    ...mapState({
      backlog: 'backlog',
      todo: 'todo',
      doing: 'doing',
      done: 'done'
    })
  },
  methods: {
    ...mapActions([
      'listTask'
    ]),
    changeBacklog: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('backlog')
      // this.seenCard = false
      this.listTask()
    },
    changeTodo: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('todo')
      // this.seenCard = false
      this.listTask()
    },
    changeDoing: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('doing')
      // this.seenCard = false
      this.listTask()
    },
    changeDone: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('done')
      // this.seenCard = false
      this.listTask()
    },
    collapsible: function () {
      if (this.seenCard) {
        this.seenCard = false
      } else {
        this.seenCard = true
      }
    },
    deleteTask: function (id, task) {
      // var db = firebase.database()
      swal('Successfully Delete', task, 'success')
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this task!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            var database = firebase.database()
            var postsRef = database.ref('kanban')
            var usersRef = postsRef.child(id)
            usersRef.set({})
            this.listTask()
            swal('Poof! Your task has been deleted!', {
              icon: 'success'
            })
          } else {
            swal('Your task is safe!')
          }
        })
    }
  }
}
</script>
