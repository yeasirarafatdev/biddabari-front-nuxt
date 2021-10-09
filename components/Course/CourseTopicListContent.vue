<template>
    <v-expansion-panel-content>
        <v-list>
            <v-list-item-group color='primary' :value='true'>
                <template v-if='isContentViewable'>
                    <v-list-item
                        v-for='(content, i) in topicContents'
                        :key='i'
                        :disabled='((content.exam || content.written_exam) && !$auth.loggedIn) || (!content.allow || !isAccessible)'
                        @click.stop.prevent='displayContent(content, !!(content.exam || content.written_exam))'>
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

        <template>
            <div class='text-center'>
                <v-dialog
                    v-model='displayProceedToExamDialog'
                    width='500'
                >
                    <v-card>
                        <v-card-title class='text-h5 grey lighten-2'>
                            Exam Confirmation
                        </v-card-title>

                        <v-card-text>
                            <div class='mt-2'>
                                <strong>
                                    Do you want to participate in this exam. If "Yes" Click the <span class='color-success'>ACCEPT</span> button.
                                </strong>
                            </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn color='primary' text @click='displayExamContent()'>I accept</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color='error' text @click='doNotDisplayExamContent()'>No</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </template>

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
    data: () => ({
        displayProceedToExamDialog: false,
        contentId: 0
    }),
    beforeDestroy() {
        this.$store.dispatch('appStore/toggleWantToViewContentDialog', false)
    },
    methods: {
        wantToViewContentDialog() {
            this.$store.dispatch('appStore/toggleWantToViewContentDialog', true)
        },
        displayContent(content, isExam) {
            if (isExam) {
                if (content.exam && content.exam.attended) this.$emit('displayCourseContent', content.id)
                else if (content.written_exam && content.written_exam.attended) this.$emit('displayCourseContent', content.id)
                else {
                    this.displayProceedToExamDialog = true
                    this.contentId = content.id
                }
            } else {
                this.$emit('displayCourseContent', content.id)
            }
        },
        displayExamContent() {
            this.$emit('displayCourseContent', this.contentId)
            this.displayProceedToExamDialog = false
            this.contentId = 0
        },
        doNotDisplayExamContent() {
            this.displayProceedToExamDialog = false
            this.contentId = 0
        }
    }
}
</script>
