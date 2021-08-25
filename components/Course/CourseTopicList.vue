<template>
    <v-expansion-panels accordion focusable>
        <v-expansion-panel
            v-for='(topic, i) in courseTopics'
            :key='i'
        >
            <v-expansion-panel-header><strong>{{ topic.name }}</strong></v-expansion-panel-header>
            <lazy-course-topic-list-content
                v-if='topic.contents && topic.contents.length'
                :is-accessible='isAccessible'
                :topic-contents='topic.contents'
                :is-content-viewable='isContentViewable'
                @displayCourseContent='displayContent($event)'
            />
            <v-expansion-panel-content v-else>
                <v-alert
                    border='top'
                    color='red lighten-2'
                    dark>
                    Sorry! No content found.
                </v-alert>
            </v-expansion-panel-content>

        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    props: {
        courseTopics: {
            type: Array,
            required: true
        },
        isContentViewable: {
            type: Boolean,
            default: false
        },
        isAccessible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        displayContent(contentId) {
            this.$emit('displayCourseContent', contentId)
        }
    }
}
</script>
