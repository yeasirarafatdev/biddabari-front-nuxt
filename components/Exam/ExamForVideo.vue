<template>
    <div id='exam-container'>
        <div v-if='loading.exam' class='text-center my-16'>
            <v-dialog v-model='loading.exam' hide-overlay persistent width='300'>
                <v-card color='primary' dark>
                    <v-card-text class='py-2'>
                        Preparing Exam Questions
                        <v-progress-linear indeterminate color='white' class='mb-2' />
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-progress-circular
                indeterminate
                color='primary'
            />
        </div>
        <v-card v-else elevation='2' class='px-2 py-2 relative'>

            <!-- Normal MCQ Exam Component -->
            <exam-taken
                v-if="exam && exam.mode === 'exam'"
                :key='exam.id'
                :exam='exam'
                :video-exam='videoExam'
                @submitted='getExamData()'
            />

            <!-- Group Exam Component -->
            <exam-group-exam v-if="exam && exam.mode === 'group_exam'"
                             :key='exam.id'
                             :exam='exam'
                             :video-exam='videoExam'
                             @submitted='getExamData()'
            />

            <!--Practice Exam Component -->
            <exam-practice-exam
                v-if="exam && exam.mode === 'practice'"
                :video-exam='videoExam'
                :key='exam.id'
                :exam='exam'
            />

        </v-card>
    </div>
</template>

<script>
export default {
    props: ['examId'],
    data() {
        return {
            exam: {},
            loading: {
                exam: false
            },
            videoExam: true
        }
    },
    watch: {
        examId(val, oldVal) {
            this.getExamData()
        }
    },
    mounted() {
        this.getExamData()
    },
    methods: {
        async getExamData() {
            this.loading.exam = true
            const examUrl = `exams/${this.examId}`
            this.exam = await this.$axios.$get(examUrl).finally(() => {
                this.loading.exam = false
            })
            if(this.exam && this.exam.attended){
                this.$emit('examCompleted', this.exam)
            }
        }
    }
}
</script>

<style lang='scss'>
.exam-container {
    width: 100%;
    max-height: 100vh;
}

#exam-status {
    background-color: white;
    box-shadow: 0 0 6px rgba(#09153A, .4);
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 6px;
    border-radius: 4px;
}

.v-item--active {
    label {
        color: #ffbf3f !important;
    }
}
</style>
