<template>
    <v-col cols='12' lg='8' md='8' sm='12' xs='12'>
        <div v-if='this.$route.params.exam_id'>
            <lazy-mobile-exam
                v-if='exam'
                :course-content='courseTopicContent'
                :course-exam='exam'
                :token='token'
            />
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
export default {
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
    computed:{
        token(){
            return this.$route.params.token
        }
    },
    mounted() {
        this.fetchContent()
    },
    methods: {
        async fetchContent() {
            if (this.$route.params.exam_id) {
                this.loading = true
                // const courseTopicContentUrl = `api/contents/${this.$route.params.exam_id}`
                const config = {
                    headers: {Authorization: `Bearer ${this.token}`}
                };
                const examUrl = `api/exams/${this.$route.params.exam_id}`
                this.exam = await this.$axios.$get(examUrl, config).finally(() => {
                    this.loading = false
                })
                /*this.courseTopicContent = await this.$axios.$get(courseTopicContentUrl, config).finally(() => {
                    this.loading = false
                })*/
            }
        },
    }
}
</script>
