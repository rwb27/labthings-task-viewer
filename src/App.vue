<template>
  <div id="app">
    <label>Microscope Address:</label><input type="text" v-model="microscopeURL" placeholder="http://microscope.local:5000/" />
    <button @click="refreshTasks">Refresh</button>
    <TaskList :src="tasksEndpointURL" ref="taskList" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskList
  },
  data: function(){
    return {
      microscopeURL: "http://orange-and-pink.local:5000/"
    }
  },
  computed: {
    tasksEndpointURL: function() {
      return this.microscopeURL + "/api/v2/tasks/"
    }
  },
  methods: {
    refreshTasks: function(){
      this.$refs.taskList.refreshTasks()
    }
  }
}
</script>

<style lang="less">
// Basic UIkit CSS
@import "../node_modules/uikit/src/less/uikit.less";
// Custom UIkit CSS modifications
@import "./assets/less/theme.less";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  height: 100%;
}

.uk-disabled {
  pointer-events: none;
  opacity: 0.4;
}
</style>
