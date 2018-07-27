<template>
  <div class="home">
    <buttonAdd/>
    <Kanban/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import buttonAdd from '@/components/AddButton.vue'
import Kanban from '@/components/CardCanban.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    buttonAdd,
    Kanban
  }
}
</script>
