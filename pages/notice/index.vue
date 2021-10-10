<template>
    <section class='vH-100 vW-100 max-width-'>

        <the-breadcrum :items-push="[{text: 'Notice Board',disabled: true,href: '/notice'}]" />

        <div class='mt-8'>
            <v-row>
                <v-col cols='12'>
                    <h3 class='mb-6 bg-yellow px-4 py-2' style='color: #09153A; border-radius: 4px;'>Notice Board</h3>
                </v-col>

                <v-col cols='12' lg='8' md='8' sm='7' xs='12'>
                    <nuxt-child v-if='$route.params.slug' :notice-id='$route.params.slug'></nuxt-child>
                    <template v-else>
                        <v-col cols='12' v-if='!$fetchState.pending'>
                            <v-alert
                                border='left'
                                color='indigo'
                                dark
                            >
                                No Notice Found.
                            </v-alert>
                        </v-col>
                    </template>
                </v-col>

                <v-col cols='12' lg='4' md='4' sm='5' xs='12'>
                    <v-card v-if='allNotice && Object.keys(allNotice).length' max-height='500' style='overflow: auto'>
                        <v-card-title style='background-color: #09153A; color: white;'>Latest Notice</v-card-title>

                        <nuxt-link v-for='notice in allNotice' :key='notice.id' :to='"/notice/"+notice.slug' class='d-flex justify-start px-2 py-2'>
                            <img :src='notice.photo' alt='' class='mr-2' style='height: 60px; width: 80px; object-fit: cover; object-position: center'>
                            <div>
                                <div class='text-12 text-muted'>{{ formatDate(notice.created_at) }}</div>
                                <strong class='text-14'>{{ notice.title }}</strong>
                            </div>
                        </nuxt-link>
                    </v-card>
                </v-col>

            </v-row>
        </div>
    </section>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            allNotice: {},
            pushSingleNotice: {}
        }
    },
    async fetch() {
        const url = 'notices?filter=notice'
        const allNotice = await this.$axios.$get(url)
        this.allNotice = allNotice.data
        this.findingFirstContent()
    },
    head() {
        return {
            title: 'Notice',
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
        $route() {
            this.findingFirstContent()
        }
    },
    methods: {
        formatDate(Date) {
            return moment(Date).format('Do MMMM YYYY')
        },
        findingFirstContent() {
            if (!this.$route.params.slug) {
                if (this.allNotice && Object.keys(this.allNotice).length) {
                    const noticeId = this.allNotice[0].slug
                    this.$router.push(`/notice/${noticeId}`)
                }
            }
        }
    }
}
</script>
