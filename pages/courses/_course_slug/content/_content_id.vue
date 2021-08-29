<template>
    <v-col cols='12' lg='8' md='8' sm='12' xs='12'>
        <div v-if='courseTopicContent.video'>
            <template v-if='courseTopicContent.video.exam_id && !courseTopicContent.video.passed_exam'>
                <div class='text-center'>
                    <div v-if='$auth.loggedIn'>
                        <div v-if='!proceedToExam'>
                            <div>You need to attend an exam to continue watching this video.</div>
                            <v-btn color='primary' class='mt-2' @click='proceedToExam=true'>Proceed</v-btn>
                        </div>
                    </div>
                    <div v-else>
                        <div>You need to attend an exam to continue watching this video. Please
                            <nuxt-link to='/auth/login'>Login</nuxt-link>
                            first.
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <video-embed css='embed-responsive-16by9' :src='courseTopicContent.video.link'></video-embed>
            </template>
            <template v-if='courseTopicContent.video.exam_id && $auth.loggedIn'>
                <exam-for-video
                    v-if='proceedToExam || courseTopicContent.video.passed_exam'
                    :course-content='courseTopicContent'
                    :exam-id='courseTopicContent.video.exam_id'
                    @examCompleted='reloadVideo($event)'
                />
            </template>
        </div>
        <div v-else-if='courseTopicContent.pdf'>
            <iframe height='100%' width='100%' :src='courseTopicContent.pdf.link'
                    style='height: 400vh; max-height: 100vh'>
            </iframe>
        </div>
        <div v-else-if='courseTopicContent.note'>
            <div v-html='courseTopicContent.note.body' />
        </div>
        <div v-else-if='courseTopicContent.exam'>
            <exam
                v-if='courseTopicContent.exam'
                :course-content='courseTopicContent'
                :course-exam='courseTopicContent.exam'
            />
        </div>
        <div v-else-if='courseTopicContent.written_exam'>
            <exam-written
                v-if='courseTopicContent.written_exam'
                :course-content='courseTopicContent'
                :course-exam='courseTopicContent.written_exam'
            />
        </div>
        <div v-else>
            <v-alert
                v-if='!loading'
                border='left'
                color='indigo'
                dark
            >
                Sorry! The content you are looking for does not exists.
            </v-alert>
            <div v-else class='text-center my-14'>
                <v-progress-circular
                    :size='50'
                    :width='5'
                    color='purple'
                    indeterminate
                ></v-progress-circular>
            </div>
        </div>
    </v-col>
</template>

<script>
export default {
    props: {
        courseSlug: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            courseTopicContent: {},
            loading: true,
            proceedToExam: false
        }
    },
    watch: {
        $route(to, from) {
            this.fetchContent()
        }
    },
    mounted() {
        this.fetchContent()
    },
    methods: {
        async fetchContent() {
            if (this.$route.params.content_id) {
                this.loading = true
                const courseTopicContentUrl = `api/contents/${this.$route.params.content_id}`
                this.courseTopicContent = await this.$axios.$get(courseTopicContentUrl).finally(() => {
                    this.loading = false
                })
            }
        },
        reloadVideo(event) {
            console.log(event)
            if (event.attended) {
                this.fetchContent()
            }
        }
    }
}
</script>
