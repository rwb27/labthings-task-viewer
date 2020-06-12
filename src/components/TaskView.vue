<template>
    <div class="taskview">
        <i class="material-icons text-height-icons" :uk-tooltip="task.status" :title="task.status">{{statusIcon}}</i>
        <i class="material-icons text-height-icons uk-float-right" @click="expanded = !expanded">
            {{expanded ? "unfold_less" : "unfold_more"}}
        </i>
        <b>Start:</b>{{task.start_time}}
        <ul class="uk-list" v-if="expanded">
            <li is="LogLine" 
                v-for="entry in task.log"
                :key="task.id + '-log-line-' + entry.created"
                :entry="entry" />
        </ul>
        <div class="task-return-value" v-if="expanded">
            {{task.showReturnValue}}
        </div>
    </div>
</template>

<script>
import LogLine from "./LogLine.vue"

export default {
    name: "TaskView",
    components: {
        LogLine
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