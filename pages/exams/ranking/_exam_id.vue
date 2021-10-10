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
                    :items='itemsWithSno'
                    :search='search'>
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
                    value: 'sno'
                },
                { text: 'Name', value: 'name' },
                { text: 'Obtained Marks', value: 'obtained_marks' }
            ]
        }
    },
    computed: {
        itemsWithSno() {
            return this.rankings.map((d, index) => ({ ...d, sno: index + 1 }))
        },
    },
    async fetch() {
        const config = {
            headers: { Authorization: `Bearer ${this.token}` }
        }
        const URL = `exam-reports?filter=web&id=${this.$route.params.exam_id}`
        console.log(URL);
        this.rankings = await this.$axios.$get(URL, config)
    },
    fetchOnServer: false,
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
