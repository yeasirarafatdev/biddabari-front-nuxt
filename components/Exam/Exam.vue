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
            <v-progress-circular indeterminate color='primary' />
        </div>
        <v-card v-else elevation='2' class='px-2 py-2 relative'>
            <template v-if='Object.keys(exam).length && (exam.mcqs && exam.mcqs.length)'>
                <!-- Normal MCQ Exam Component -->
                <exam-taken
                    v-if="exam && exam.mode === 'exam'"
                    :key='exam.id'
                    :exam='exam'
                    @submitted='getExamData()'
                />
                <!--Practice Exam Component -->
                <exam-practice-exam
                    v-if="exam && exam.mode === 'practice'"
                    :key='exam.id'
                    :exam='exam'
                />
            </template>
            <template v-else-if="Object.keys(exam).length && (exam.sections && exam.sections.length) && exam.mode === 'group_exam'">
                <!-- Group Exam Component -->
                <exam-group-exam
                    v-if="exam && exam.mode === 'group_exam'"
                    :key='exam.id'
                    :exam='exam'
                    @submitted='getExamData()'
                />
            </template>
            <template v-else>
                <v-alert border='left' color='error lighten-2' dark>
                    There is no questions available for this exam. Please Check After some Time.
                </v-alert>
            </template>
        </v-card>
    </div>
</template>

<script>
import ExamTaken from '~/components/Exam/ExamTaken'
import ExamGroupExam from '~/components/Exam/ExamGroupExam'
import ExamPracticeExam from '~/components/Exam/ExamPracticeExam'

export default {
    components: { ExamPracticeExam, ExamGroupExam, ExamTaken },
    props: {
        courseExam: {
            type: Object,
            required: true
        }
    },
    computed: {
        token() {
            return this.$route.params.token ?? null
        }
    },
    data() {
        return {
            exam: {},
            loading: {
                exam: false
            }
        }
    },
    watch: {
        courseExam(val, oldVal) {
            this.getExamData()
        }
    },
    mounted() {
        this.getExamData()
    },
    methods: {
        async getExamData() {
            this.loading.exam = true
            const examUrl = `exams/${this.courseExam.id}`
            let config = {}
            if (this.token) {
                config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                }
            }
            await this.$axios.$get(examUrl, config).then((response) => {
                this.exam = response
            }).finally(() => {
                this.loading.exam = false
            })
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
