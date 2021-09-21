<template>
    <div>
        <section class='vH-100 vW-100 mt-16 max-width-'>

            <v-card v-if='rankings && rankings.length'>
                <v-card-title>
                    <v-text-field
                        v-model='search'
                        append-icon='mdi-magnify'
                        label='Search'
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :sort-by="['obtained_marks']"
                    :sort-desc='[true]'
                    :headers='headers'
                    :items='rankings'
                    :search='search'>
                    <template v-slot:item.position>
                        {{ countPosition(counter) }}
                    </template>
                </v-data-table>
            </v-card>

        </section>
    </div>
</template>

<script>
export default {
    layout: 'mobile',
    props: ['token'],
    data() {
        return {
            rankings: {},
            search: '',
            counter: 0,
            headers: [
                {
                    text: 'Position',
                    align: 'start',
                    filterable: true,
                    value: 'position'
                },
                { text: 'Name', value: 'name' },
                { text: 'Obtained Marks', value: 'obtained_marks' }
            ]
        }
    },
    async fetch() {
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        }
        const URL = `api/exam-reports?filter=web&id=${this.$route.params.exam_id}`
        console.log(URL);
        this.rankings = await this.$axios.$get(URL, config)
    },
    fetchOnServer: false,
    methods: {
        countPosition(n) {
            console.log(n , this.rankings.obtained_marks)
            if (n <= this.rankings.length) {
                this.counter = n + 1
                return this.counter
            }
        },
    },
    head() {
        return {
            title: 'Exam Ranking',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    }
}
</script>
