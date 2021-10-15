<template>
    <v-col cols='12' lg='8' md='8' sm='12' xs='12'>
        <div v-if='this.$route.params.exam_id'>
            <!--            <lazy-mobile-exam
                            v-if='exam'
                            :course-content='courseTopicContent'
                            :course-exam='exam'
                            :token='token'
                        />-->
            <template v-if='$auth.loggedIn || token'>
                <exam v-if='courseTopicContent.exam'
                      :courseContent='courseTopicContent'
                      :courseExam='courseTopicContent.exam'
                />
                <exam-for-video
                    v-else-if='courseTopicContent.video && !courseTopicContent.video.passed_exam'
                    :courseContent='courseTopicContent'
                    :examId='courseTopicContent.video.exam_id'
                />
            </template>
        </div>
        <div v-else>
            <v-alert v-if='!loading' border='left' color='indigo' dark>
                Sorry! The content you are looking for does not exists.
            </v-alert>
            <div v-else class='text-center my-14'>
                <v-progress-circular
                    v-if='$route.params.examId'
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
import Exam from '~/components/Exam/Exam'
import ExamForVideo from '~/components/Exam/ExamForVideo'

export default {
    components: { ExamForVideo, Exam },
    layout: 'mobile',
    data() {
        return {
            courseTopicContent: {},
            loading: true,
            exam: []
        }
    },
    watch: {
        $route(to, from) {
            this.fetchContent()
        }
    },
    computed: {
        token() {
            return this.$route.params.token ?? null
        }
    },
    mounted() {
        this.fetchContent()
    },
    methods: {
        async fetchContent() {
            if (this.$route.params.exam_id) {
                this.loading = true
                const config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                }
                const examUrl = `exams/${this.$route.params.exam_id}`
                this.exam = await this.$axios.$get(examUrl, config).finally(() => {
                    this.loading = false
                })
                if (this.exam.content_id) {
                    await this.loadCourseTopicContent(this.exam.content_id, config)
                }
                if (this.exam.video_id) {
                    const videoUrl = `videos/${this.exam.video_id}`
                    await this.$axios.$get(videoUrl, config).then((response) => {
                        this.loadCourseTopicContent(response.content_id, config)
                        // this.courseTopicContent = response
                    }).finally(() => {
                        this.loading = false
                    })
                }
            }
        },
        async loadCourseTopicContent(content_id, config) {
            const courseTopicContentUrl = `contents/${content_id}`
            await this.$axios.$get(courseTopicContentUrl, config).then((response) => {
                this.courseTopicContent = response
                console.log(this.courseTopicContent)
            }).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
