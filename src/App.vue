<template>
  <div id="app">
    <form class="controls uk-form-horizontal">
      <div>
        <label class="uk-form-label">Microscope Address:</label>
        <div class="uk-form-controls">
          <input type="text" class="uk-input" v-model="microscopeURL" placeholder="http://microscope.local:5000/" />
        </div>
      </div>
      <div>
        <label class="uk-form-label">Refresh Interval</label>
        <div class="uk-form-controls">
          <select class="uk-select" v-model="refreshIntervalString">
              <option value="500">0.5 s</option>
              <option value="1000">1 s</option>
              <option value="10000">10 s</option>
              <option value="60000">1 min</option>
          </select>
        </div>
        <button class="uk-button" @click.stop.prevent="refreshTasks">Refresh</button>
      </div>
    </form>

    <TaskList 
      :src="tasksEndpointURL" 
      :refreshInterval="refreshInterval"
      :maximumNumberOfItems="maxTasks"
      ref="taskList" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue'

export default {
  name: 'App',
  components: {
    TaskList,
  },
  data: function(){
    return {
      microscopeURL: "http://microscope.local:5000/",
      refreshInterval: 500,
      maxTasks: 5,
    }
  },
  computed: {
    tasksEndpointURL: function() {
      if(this.microscopeURL) return this.microscopeURL + "/api/v2/tasks/"
      else return ""
    },
    refreshIntervalString: {
      get: function(){ return this.refreshInterval.toString()},
      set: function(val){ this.refreshInterval = Number(val)},
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
