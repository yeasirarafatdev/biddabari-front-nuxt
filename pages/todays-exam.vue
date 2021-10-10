<template>
    <section class='vH-100 vW-100 mt-16 max-width-'>

        <the-breadcrum :items-push="[{text: `Today's Exam`,disabled: true,href: '/todays-exam'}]" />

        <v-card>
            <v-card-title class='bg-yellow'>Today's Exam</v-card-title>
            <div v-if='$fetchState.pending'>
                <v-alert
                    border='top'
                    color='info lighten-1'
                    dark
                >
                    Loading Content ...
                </v-alert>
            </div>
            <div v-else-if='$fetchState.error'>
                <v-alert
                    border='top'
                    color='red lighten-2'
                    dark
                >
                    {{ $fetchState.error && $fetchState.error.response && $fetchState.error.response.status == 403 ? 'Access Denied!' : $fetchState.error.message }}
                </v-alert>
            </div>
            <div v-else>
                <v-card-text v-if='exams && exams.length'>
                    <div v-for='exam in exams' :key='exam.id' class='d-flex flex-wrap justify-space-between align-center'>
                        <div>
                            <strong>{{ exam.exam.title }}</strong>
                            <span class='text-muted'>{{ exam.course.title }}</span>
                        </div>
                        <strong>
                            <v-icon>mdi-clock</v-icon>
                            {{ formatDate(exam.available_at) }}
                        </strong>
                    </div>
                    <v-divider class='mx-4'></v-divider>
                </v-card-text>
            </div>
        </v-card>

    </section>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            exams: []
        }
    },
    async fetch() {
        const examsUrl = 'exams?filter=today-web'
        this.exams = await this.$axios.$get(examsUrl)
    },
    fetchOnServer: true,
    head() {
        return {
            title: "Today's Exam",
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Today`s exam routine for Biddabari.'
                }
            ]
        }
    },
    methods:{
        formatDate(Date) {
            return moment(Date).format('Do MMMM YYYY, h:mm:ss a')
        },
    }
}
</script>
