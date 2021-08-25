<template>
    <v-card :loading='loading'>
        <template v-if='!loading'>
            <div v-if='notice && Object.keys(notice).length'>
                <v-card-title>{{ notice.title }}</v-card-title>
                <div class='text-center'>
                    <img :src='notice.photo' alt='' style='max-width: 100%; max-height: 400px;'>
                </div>
                <div class='px-4 py-4' v-html='notice.body'></div>
            </div>
            <div v-else>
                <v-alert
                    border='left'
                    color='error lighten-1'
                    dark>
                    Sorry! Content not found.
                </v-alert>
            </div>
        </template>
        <div v-else class='text-center my-4'>
            <v-progress-circular
                :size='50'
                indeterminate
                color='primary'
            ></v-progress-circular>
        </div>
    </v-card>
</template>

<script>
export default {
    props: {
        noticeId: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            loading: true,
            notice: {}
        }
    },
    head() {
        return {
            title: this.notice && this.notice.length ? this.notice.title : 'Notice',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    },
    watch: {
        noticeId() {
            this.fetchNotice()
        }
    },
    mounted() {
        this.fetchNotice()
    },
    methods: {
        async fetchNotice() {
            this.loading = true
            const url = `api/notices/${this.noticeId}`
            this.notice = await this.$axios.$get(url).finally(() => {
                this.loading = false
            })
        }
    }
}
</script>
