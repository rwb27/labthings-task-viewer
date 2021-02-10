<template>
    <li class="logline uk-margin-left" 
        :class="{'expanded': expanded, 'oneline': !expanded}"
        @dblclick="expanded = !expanded" >
        <i  class="material-icons text-height-icons" 
            :uk-tooltip="entry.levelname" 
            :title="entry.levelname">
                {{levelIcon}}
        </i>
        <i class="material-icons text-height-icons uk-float-right">
            {{expanded ? "unfold_less" : "unfold_more"}}
        </i>
        <span class="message">
            {{entry.message}}
        </span>
    </li>
</template>

<script>
export default {
    name: "LogLine",
    props: {
        entry: {type: Object}
    },
    data: function() {
        return {
            expanded: false
        }
    },
    computed: {
        levelIcon: function() {
            switch(this.entry.levelname){
                case "INFO":
                    return "info"
                case "WARNING":
                    return "report_problem"
                case "DEBUG":
                    return "bug_report"
                case "ERROR":
                    return "highlight_off"
                default:
                    return "help"
            }
        }
    }
}
</script>

<style scoped>
.logline {}
.oneline {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.expanded{
    height: auto;
}
.expanded .message{
    white-space: pre-wrap;
}
</style>