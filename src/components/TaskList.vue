<template>
    <div class="tasklist-container">
        <div class="tasklist uk-list">
            <TaskView
                v-for="task in sortedTasks"
                :task="task"
                :key="task.id"
                />
        </div>
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
            maximumNumberOfItems: 5
        }
    },
    props: {
        src: {type: String}
    },
    computed: {
        sortedTasks: function() {
            let stasks = this.tasks.slice(0).sort((a, b) => a.start_time > b.start_time ? 1 : -1)
            return stasks.slice(Math.max(stasks.length - this.maximumNumberOfItems, 0))
        }
    },
    methods: {
        refreshTasks(){
            // Update the `tasks` data element from our source URL
            axios.get(this.src)
            .then(response => {
                this.tasks = response.data
            })  // TODO: make sure errors get handled??
        }
    },
    created() {
        this.refreshTasks()
        setInterval(function () {
            this.refreshTasks();
        }.bind(this), 500); 
    }
}
</script>

<style scoped>
.tasklist {
    list-style-type: none;
}
</style>