<template>
    <div class="show">
      <!-- {{backlog}} -->
      {{seenCard}}
      <div class="row">
        <div class="col s3 m3" id="backlog">
            <ul class="collapsible" style="padding-right: 5px"  @click="collapsible">
              <li>
                <div class="collapsible-header"><i class="material-icons">event_note</i>BACKLOG</div>
                <div v-if="seenCard"></div>
                <div class="collapsible-body" style="display:block" v-else>
                  <span>
                    <div class="row" v-for="task in backlog">
                      <div class="col s12 m12">
                        <div class="card">
                          <div class="card-content">
                            <h4>{{task.task}}</h4><br>
                            <div class='content-task' style="text-align:left">
                              <h6>description: {{task.description}}</h6>
                              <h6>point: {{task.point}}</h6>
                              <h6>assign to: {{task.assign}}</h6>
                              <h6>status: {{task.status}}</h6>
                            </div>
                          </div>
                          <div class="card-action">
                            <!-- <button><i class="material-icons">arrow_back</i></button> -->
                            <button><i class="material-icons">create</i></button>
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
          <ul class="collapsible" style="padding-right: 5px"  @click="collapsible">
            <li>
              <div class="collapsible-header"><i class="material-icons">event_note</i>TODO</div>
              <div v-if="seenCard"></div>
              <div class="collapsible-body" style="display:block" v-else>
                <span>
                  <div class="row" v-for="task in todo">
                    <div class="col s12 m12">
                      <div class="card">
                        <div class="card-content">
                          <h4>{{task.task}}</h4><br>
                          <div class='content-task' style="text-align:left">
                            <h6>description: {{task.description}}</h6>
                            <h6>point: {{task.point}}</h6>
                            <h6>assign to: {{task.assign}}</h6>
                            <h6>status: {{task.status}}</h6>
                          </div>
                        </div>
                        <div class="card-action">
                          <button @click="changeBacklog(task.id)"><i class="material-icons">arrow_back</i></button>
                          <button><i class="material-icons">create</i></button>
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
          <ul class="collapsible" style="padding-right: 5px"  @click="collapsible">
            <li>
              <div class="collapsible-header"><i class="material-icons">event_note</i>DOING</div>
              <div v-if="seenCard"></div>
              <div class="collapsible-body" style="display:block" v-else>
                <span>
                  <div class="row" v-for="task in doing">
                    <div class="col s12 m12">
                      <div class="card">
                        <div class="card-content">
                          <h4>{{task.task}}</h4><br>
                          <div class='content-task' style="text-align:left">
                            <h6>description: {{task.description}}</h6>
                            <h6>point: {{task.point}}</h6>
                            <h6>assign to: {{task.assign}}</h6>
                            <h6>status: {{task.status}}</h6>
                          </div>
                        </div>
                        <div class="card-action">
                          <button @click="changeTodo(task.id)"><i class="material-icons">arrow_back</i></button>
                          <button><i class="material-icons">create</i></button>
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
          <ul class="collapsible" style="padding-right: 5px" @click="collapsible">
            <li>
              <div class="collapsible-header"><i class="material-icons">event_available</i>DONE</div>
              <div v-if="seenCard"> </div>
              <div class="collapsible-body" style="display:block" v-else>
                <span>
                  <div class="row" v-for="task in done">
                    <div class="col s12 m12">
                      <div class="card">
                        <div class="card-content">
                          <h4>{{task.task}}</h4><br>
                          <div class='content-task' style="text-align:left">
                            <h6>description: {{task.description}}</h6>
                            <h6>point: {{task.point}}</h6>
                            <h6>assign to: {{task.assign}}</h6>
                            <h6>status: {{task.status}}</h6>
                          </div>
                        </div>
                        <div class="card-action">
                          <button @click="changeDoing(task.id)"><i class="material-icons">arrow_back</i></button>
                          <button><i class="material-icons">create</i></button>
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
      <!-- <div v-if='seenedit'></div>
      <div v-else> -->
        <Edit/>
      <!-- </div> -->
    </div>
</template>

<script>
import firebase from 'firebase'
import Edit from '@/components/EditKanban.vue'

export default {
  name: 'show',
  // components: ('child',{
  //   props: [this.task],
  //   template: 
  // }),
  data () {
    return {
      kanban: '',
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      seenCard: true,
      task:'',
      seenedit:true
    }
  },
  created () {
    this.showData()
  },
  methods: {
    showData: function () {
      // this.seenCard = false
      this.backlog = []
      this.todo = []
      this.doing = []
      this.done = []
      var ref = firebase.database().ref('kanban')
      const self = this
      ref.on('value', function (snapshot) {
        var result = snapshot.val()
        console.log(typeof result)
        for (var key in result) {
          result[key].id = key
          if (result[key].status === 'backlog') {
            self.backlog.push(result[key])
          } else if (result[key].status === 'todo') {
            self.todo.push(result[key])
          } else if (result[key].status === 'doing') {
            self.doing.push(result[key])
          } else if (result[key].status === 'done') {
            self.done.push(result[key])
          }
        }
      })
    },
    changeBacklog: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('backlog')
      // this.seenCard = false
      this.showData()
    },
    changeTodo: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('todo')
      // this.seenCard = false
      this.showData()
    },
    changeDoing: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('doing')
      // this.seenCard = false
      this.showData()
    },
    changeDone: function (id) {
      console.log(id)
      var db = firebase.database()
      db.ref('kanban/' + id + '/status').set('done')
      // this.seenCard = false
      this.showData()
    },
    collapsible: function () {
      if (this.seenCard) {
        this.seenCard = false
      } else {
        this.seenCard = true
      }
    },
    editTask : function (task) {

    }
  }
}
</script>
