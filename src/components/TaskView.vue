<template>
    <li class="taskView">
        <div class="taskViewFirstLine"  @click="expanded = !expanded">
        <i class="material-icons text-height-icons" :uk-tooltip="task.status" :title="task.status">{{statusIcon}}</i>
        <i class="material-icons text-height-icons uk-float-right">
            {{expanded ? "unfold_less" : "unfold_more"}}
        </i>
        <b>Start:</b>{{task.start_time}}
        </div>
        <div class="taskDetails uk-margin-left" v-if="expanded">
            <h4>Log</h4>
            <ul class="uk-list uk-list-collapse logList">
                <li is="LogLine" 
                    v-for="entry in task.log"
                    :key="task.id + '-log-line-' + entry.created"
                    :entry="entry" />
            </ul>
            <h4>Return Value</h4>
            <tree-view :data="task.return" :options="{maxDepth: 1}"></tree-view>
        </div>
    </li>
</template>

<script>
import LogLine from "./LogLine.vue"
import TreeView from "vue-json-tree-view"
import Vue from "vue"
Vue.use(TreeView) // I don't know why I can't just put TreeView in components

export default {
    name: "TaskView",
    components: {
        LogLine,
    },
    props: {
        task: {type: Object}
    },
    data: function() {
        return {
            expanded: false,
        }
    },
    computed: {
        statusIcon: function() {
            switch(this.task.status){
                case "success":
                    return "check_circle"
                case "idle":
                    return "hourglass_empty"
                case "running":
                    return "hourglass_full"
                case "error":
                    return "error"
                default:
                    return "help"
            }
        }
    },
    watch: {
        "task.status": function(newval, oldval){
            // We want to default to being open while the task runs, but 
            // allow the user to close it - hence the use of a watcher rather
            // than a computed property
            console.log("Got a change in status from " + oldval + " to " + newval)
            if(newval == "running"){
                this.expanded = true
            }
            if(oldval == "running" & newval == "success"){
                this.expanded = false
            }
        }
    },
    mounted() {
        if(this.task.status == "running"){
            this.expanded = true
        }
    }
}
</script>

<style >
.text-height-icons {
    font-size: 120%;
    vertical-align: middle;
}
</style>