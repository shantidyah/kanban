import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    backlog: [],
    todo: [],
    doing: [],
    done: []
  },
  mutations: {
    backlog (state, payload) {
      state.backlog = payload
    },
    todo (state, payload) {
      state.todo = payload
    },
    doing (state, payload) {
      state.doing = payload
    },
    done (state, payload) {
      state.done = payload
    }
  },
  actions: {
    listTask: function ({ commit }, payload) {
      var backlog = []
      var todo = []
      var doing = []
      var done = []
      var ref = firebase.database().ref('kanban')
      ref.on('value', function (snapshot) {
        var result = snapshot.val()
        console.log(typeof result)
        for (var key in result) {
          result[key].id = key
          if (result[key].status === 'backlog') {
            backlog.push(result[key])
          } else if (result[key].status === 'todo') {
            todo.push(result[key])
          } else if (result[key].status === 'doing') {
            doing.push(result[key])
          } else if (result[key].status === 'done') {
            done.push(result[key])
          }
        }
        commit('backlog', backlog)
        commit('todo', todo)
        commit('doing', doing)
        commit('done', done)
      })
    }
  }
})
