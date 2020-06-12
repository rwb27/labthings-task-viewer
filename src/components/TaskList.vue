<template>
    <div class="tasklist-container">
        <ul class="tasklist uk-list uk-list-divider">
            <TaskView
                v-for="task in sortedTasks"
                :task="task"
                :key="task.id"
                />
        </ul>
    </div>
</template>

<script>
import axios from "axios"
import TaskView from "./TaskView.vue"

export default {
    name: "TaskList",
    components: {
        TaskView
    },
    data: function() {
        return {
            tasks: [],
            refreshIntervalReference: null,
        }
    },
    props: {
        src: {type: String},
        maximumNumberOfItems: {type: Number, default: 5},
        refreshInterval: {type: Number, default: 500},
    },
    computed: {
        sortedTasks: function() {
            let stasks = this.tasks.slice(0).sort((a, b) => a.start_time > b.start_time ? 1 : -1)
            return stasks.slice(Math.max(stasks.length - this.maximumNumberOfItems, 0))
        }
    },
    watch: {
        refreshInterval: function() { this.setRefreshInterval()},
        src: function() { this.refreshTasks()},
    },
    methods: {
        refreshTasks(){
            // Update the `tasks` data element from our source URL
            if(this.src) axios.get(this.src)
            .then(response => {
                this.tasks = response.data
            })  // TODO: make sure errors get handled??
        },
        setRefreshInterval(){
            if(this.refreshIntervalReference) clearInterval(this.refreshIntervalReference)
            this.refreshIntervalReference = setInterval(function () {
                this.refreshTasks();
            }.bind(this), this.refreshInterval); 
        }
    },
    created() {
        this.refreshTasks()
        this.setRefreshInterval()
    }
}
</script>

<style scoped>
.tasklist {
    list-style-type: none;
}
</style>