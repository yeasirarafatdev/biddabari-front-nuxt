<template>
    <v-col cols='12' lg='8' md='8' sm='12' xs='12'>
        <div v-if='courseTopicContent.video'>
            <video-embed css='embed-responsive-16by9' :src='courseTopicContent.video.link'></video-embed>
        </div>
        <div v-else-if='courseTopicContent.pdf'>
            <iframe height='100%' width='100%' :src='courseTopicContent.pdf.link'
                    style='height: 400vh; max-height: 100vh'>
            </iframe>
        </div>
        <div v-else-if='courseTopicContent.note'>
            <div v-html="courseTopicContent.note.body"/>
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
            loading: true
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
        }
    }
}
</script>
