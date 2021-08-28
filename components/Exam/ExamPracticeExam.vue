<template>
    <v-card id='questions' flat class='mb-10 pb-5'>
        <div v-if='!mcqs' class='d-flex justify-center align-center content-loading'>
            <v-card outlined class='d-flex justify-center align-center content-loading'>
                <v-progress-circular
                    :size='50'
                    color='primary'
                    indeterminate
                ></v-progress-circular>
            </v-card>
        </div>
        <v-card rounded elevation='2' class='sticky white'>
            <v-container>
                <div class='pa-4 mx-2' style='border: 2px solid dodgerblue;border-radius: 20px'>
                    <div class='d-flex justify-space-between'>
                        <div>{{ total_tried }}/{{ mcqs.length }}</div>
                        <div>Marks: {{ marks.toFixed(2) }}</div>
                    </div>
                    <v-progress-linear height='5' rounded :value='bar'></v-progress-linear>
                </div>
            </v-container>
        </v-card>
        <v-card flat style='height: 80vh; overflow: auto;'>
            <v-card-text>
                <div v-for='(mcq,index) in mcqs' :key='mcq.id'>
                    <exam-practice-mcq
                        v-model='mcq.user_answer'
                        :mcq='mcq'
                        :index='index'
                    ></exam-practice-mcq>
                </div>
            </v-card-text>
        </v-card>
    </v-card>
</template>
<script>

export default {
    props: {
        exam: {
            type: Object,
            required: true
        },
        videoExam:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: false,
            mcqs: this.exam.mcqs
        }
    },
    computed: {
        bar() {
            return this.total_tried * 100 / this.mcqs.length
        },
        total_tried() {
            const total = this.mcqs.filter((mcq) => {
                return mcq.user_answer || mcq.exam_answers.length
            })
            return total.length
        },
        marks() {
            let obtainedMarks = 0
            this.mcqs.forEach((mcq) => {
                if (mcq.user_answer && (mcq.answer === mcq[mcq.user_answer])) {
                    obtainedMarks += this.exam.per_question_mark
                }
                if (mcq.user_answer && (mcq.answer !== mcq[mcq.user_answer])) {
                    obtainedMarks -= this.exam.negative_mark
                }
            })
            return obtainedMarks
        }
    }
}
</script>
<style scoped lang='scss'>
.fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}

.sticky {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}
</style>
