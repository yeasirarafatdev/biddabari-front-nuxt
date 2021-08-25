<template>
    <v-expansion-panel-content>
        <v-list>
            <v-list-item-group color='primary' :value='true'>
                <template v-if='isContentViewable'>
                    <v-list-item
                        v-for='(content, i) in topicContents'
                        :key='i'
                        :disabled='!(content.allow || isAccessible)'
                        @click.stop.prevent='displayContent(content.id)'>
                        <course-topic-item :content='content'></course-topic-item>
                    </v-list-item>
                </template>
                <template v-else>
                    <v-list-item
                        v-for='(content, i) in topicContents'
                        :key='i'
                        link
                        @click.stop.prevent='wantToViewContentDialog()'>
                        <course-topic-item :content='content'></course-topic-item>
                    </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>
    </v-expansion-panel-content>
</template>

<script>
export default {
    props: {
        topicContents: {
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
    beforeDestroy() {
        this.$store.dispatch('appStore/toggleWantToViewContentDialog', false)
    },
    methods: {
        wantToViewContentDialog() {
            this.$store.dispatch('appStore/toggleWantToViewContentDialog', true)
        },
        displayContent(contentId) {
            this.$emit('displayCourseContent', contentId)
        }
    }
}
</script>
