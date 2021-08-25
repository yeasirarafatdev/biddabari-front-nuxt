<template>
    <div class='pa-0'>
        <v-card
            rounded='lg'
            class='mx-auto'
            tile
            flat
            :elevation='0'
        >
            <div class='text-12 text-center'>
                <div v-if='examReport'>
                    <span v-if='examReport.obtained_marks'>Your marks: <strong>{{ examReport.obtained_marks.toFixed(2) }}</strong> </span>
                    <span v-if='examReport.total_marks'> out of  <strong>{{ examReport.total_marks }}</strong></span>
                </div>
                <div v-if='examReport'>
                    <span v-if='examReport.position'>Your Position: <strong>{{ examReport.position }}</strong> </span>
                    <span v-if='examReport.total_students'>out of <strong>{{ examReport.total_students }}</strong></span>
                </div>
                <nuxt-link :to='`/exam/${examId}/ranking`'>
                    See ranking
                </nuxt-link>
                <div v-if='!isAnswerAvailable' class='overline mb-4 text-center' style='border-bottom: 2px solid dodgerblue;'>
                    Answer will be available {{ answerAvailableAt }}
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
    props: ['examReport', 'isAnswerAvailable', 'answerAvailableAt', 'examId', 'showResult'],
    methods: {
        retry() {
            this.$emit('retry')
        },
        practice() {
            this.$emit('practice')
        }
    }
}
</script>
